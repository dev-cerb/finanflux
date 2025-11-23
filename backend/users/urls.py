from django.urls import path
from .views import UsersAPIView

urlpatterns = [
    path('users/', UsersAPIView.as_view(), name='users')
]
