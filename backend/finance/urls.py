from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GeneralInformationViewSet,
    GoalViewSet,
    DebitViewSet,
    CategoryViewSet,
    TransactionViewSet,
    DashboardSummaryAPIView,
    AnalyzeFinancialView
)

router = DefaultRouter()
router.register(r'general-information', GeneralInformationViewSet, basename='general-information')
router.register(r'goals', GoalViewSet, basename='goals')
router.register(r'debits', DebitViewSet, basename='debits')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'transactions', TransactionViewSet, basename='transactions')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', DashboardSummaryAPIView.as_view(), name='dashboard-summary'),
    path('ai/analyze/', AnalyzeFinancialView.as_view(), name="ai-analyse")
]