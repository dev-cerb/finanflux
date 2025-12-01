from rest_framework import viewsets, permissions
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
    queryset = Category.objects.select_related("user")
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.select_related("user", "category")
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
