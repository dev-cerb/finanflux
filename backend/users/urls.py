from django.urls import path
from .views import UsersAPIView, LoginAPIView

urlpatterns = [
    path('users/', UsersAPIView.as_view(), name='users'),
    path('login/', LoginAPIView.as_view(), name='login')
]
