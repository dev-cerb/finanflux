from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.utils.timezone import now
from django.db.models import Sum

from .models import (
    GeneralInformation,
    Goal,
    Debit,
    Category,
    Transaction
)
from .serializers import (
    GeneralInformationSerializer,
    GoalSerializer,
    DebitSerializer,
    CategorySerializer,
    TransactionSerializer
)
from services.ai_service import analyze_financial_data

class GeneralInformationViewSet(viewsets.ModelViewSet):
    serializer_class = GeneralInformationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GeneralInformation.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DebitViewSet(viewsets.ModelViewSet):
    serializer_class = DebitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Debit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.select_related("user", "category")
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DashboardSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = now().date()
        month_start = today.replace(day=1)

        # Salário
        gi = GeneralInformation.objects.filter(user=user).first()
        salary = gi.salary if gi and gi.salary else 0
        limit = gi.limit if gi and gi.limit else 0

        # Entradas
        entries = Transaction.objects.filter(
            user=user,
            type_of_transaction='entrada',
            date__gte=month_start
        ).aggregate(total=Sum('value'))['total'] or 0

        # Saídas
        expenses = Transaction.objects.filter(
            user=user,
            type_of_transaction='saida',
            date__gte=month_start
        ).aggregate(total=Sum('value'))['total'] or 0

        # Dividas
        debit = Debit.objects.filter(
            user=user,
        ).aggregate(total=Sum('total_value'))['total'] or 0

        # Metas
        goal = Goal.objects.filter(
            user=user,
        ).aggregate(total=Sum('final_value'))['total'] or 0

        # Renda total
        total_income = salary + entries

        # Saldo
        balance = total_income - expenses

        # Categorias
        categories = Category.objects.filter(user=user)
        categories_summary = []

        for cat in categories:
            spent = Transaction.objects.filter(
                user=user,
                category=cat,
                type_of_transaction="saida",
                date__gte=month_start
            ).aggregate(total=Sum("value"))["total"] or 0

            categories_summary.append({
                "category": cat.name,
                "spent": float(spent),
                "budget": float(cat.budget) if cat.budget else None,
                "budget_exceeded": (
                    True if cat.budget and spent > cat.budget else False
                ),
            })

        # Profile
        investor_type = getattr(
            getattr(user, "profile", None), 
            "type_of_investor", 
            None
        )

        summary = {
            "username": user.username,
            "email": user.email,
            "investor_type": investor_type,
            "salary": float(salary),
            "limit": float(limit),
            "entries": float(entries),
            "debits": float(debit),
            "goals": float(goal),
            "expenses": float(expenses),
            "total_income": float(total_income),
            "balance": float(balance),

            # formatados (somente para exibição)
            "salary_formatted": f"R$ {salary:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "limit_formatted": f"R$ {limit:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "entries_formatted": f"R$ {entries:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "debits_formatted": f"R$ {debit:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "goals_formatted": f"R$ {goal:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "expenses_formatted": f"R$ {expenses:,.2f}".replace(",", "X").replace(".", ",", ).replace("X", "."),

            "total_income_formatted": f"R$ {total_income:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "balance_formatted": f"R$ {balance:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "categories": categories_summary
        }

        return Response(summary)
    
class AnalyzeFinancialView(APIView):
    def post(self, request):
        dashboard_data = request.data

        if not dashboard_data:
            return Response({
                "error": "Nenhum dado recebido para análise",
            }, status=status.HTTP_400_BAD_REQUEST)
        
        analysis = analyze_financial_data(dashboard_data)
        return Response({"analysis": analysis}, status=status.HTTP_200_OK)