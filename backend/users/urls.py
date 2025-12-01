from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsersAPIView, LoginAPIView, ProfileViewSet

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profiles')

urlpatterns = [
    path('users/', UsersAPIView.as_view(), name='users'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('', include(router.urls))
]
