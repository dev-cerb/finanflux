from rest_framework.routers import DefaultRouter
from .views import (
    GeneralInformationViewSet,
    GoalViewSet,
    DebitViewSet,
    CategoryViewSet,
    TransactionViewSet
)

router = DefaultRouter()
router.register(r'general-information', GeneralInformationViewSet, basename='general-information')
router.register(r'goals', GoalViewSet, basename='goals')
router.register(r'debits', DebitViewSet, basename='debits')
router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'transactions', TransactionViewSet, basename='transactions')

urlpatterns = router.urls
