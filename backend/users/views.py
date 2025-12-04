from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, permissions

from django.contrib.auth.hashers import check_password

from .models import Users, Profile
from .serializers import UsersSerializer, ProfileSerializer

class UsersAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        users = Users.objects.all();
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        try:
            user_obj = Users.objects.get(username=username)
        except Users.DoesNotExist:
            return Response({"error": "Usuário não encontrado"}, status=400)

        if not check_password(password, user_obj.password):
            return Response({"error": "Senha incorreta"}, status=400)

        refresh = RefreshToken.for_user(user_obj)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user_obj.username
        })
    
class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
