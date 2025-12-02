from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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

class GeneralInformationViewSet(viewsets.ModelViewSet):
    queryset = GeneralInformation.objects.select_related("user")
    serializer_class = GeneralInformationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.select_related("user")
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DebitViewSet(viewsets.ModelViewSet):
    queryset = Debit.objects.select_related("user")
    serializer_class = DebitSerializer
    permission_classes = [permissions.IsAuthenticated]

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

        # ---- 1. Salário ----
        gi = GeneralInformation.objects.filter(user=user).first()
        salary = gi.salary if gi and gi.salary else 0

        # ---- 2. Entradas ----
        entries = Transaction.objects.filter(
            user=user,
            type_of_transaction='entrada',
            date__gte=month_start
        ).aggregate(total=Sum('value'))['total'] or 0

        # ---- 3. Saídas ----
        expenses = Transaction.objects.filter(
            user=user,
            type_of_transaction='saida',
            date__gte=month_start
        ).aggregate(total=Sum('value'))['total'] or 0

        # ---- 4. Renda total ----
        total_income = salary + entries

        # ---- 5. Saldo ----
        balance = total_income - expenses

        # ---- 6. Categorias ----
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

        # ---- 7. Tipo de investidor (Profile) ----
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
            "entries": float(entries),
            "expenses": float(expenses),
            "total_income": float(total_income),
            "balance": float(balance),

            # formatados (somente para exibição)
            "salary_formatted": f"R$ {salary:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "entries_formatted": f"R$ {entries:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "expenses_formatted": f"R$ {expenses:,.2f}".replace(",", "X").replace(".", ",", ).replace("X", "."),

            "total_income_formatted": f"R$ {total_income:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "balance_formatted": f"R$ {balance:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."),

            "categories": categories_summary
        }

        return Response(summary)