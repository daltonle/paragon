from django.shortcuts import render,get_object_or_404
from .models import Profile
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework import viewsets
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    UserLoginSerializer,
    ChangePasswordSerializer
)

from django.contrib.auth import get_user_model
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,

)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from .permissions import IsLoggedInUserOrAdmin, IsSuperUser

# Create your views here.
User = get_user_model()

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user).data
    }

class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny,]

class UserLoginAPIView(APIView):
    permission_classes = [AllowAny,]
    serializer_class = UserLoginSerializer
    def post(self,request,*args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            print(new_data)
            return Response(new_data,status=HTTP_200_OK)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)

class ChangePasswordView(UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = [IsAuthenticated,]
    
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response("Success.", status=HTTP_200_OK)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsSuperUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]


class LogoutView(APIView):

    def post(self,request,format=None):
        #delete token of the user
        
        request.user.auth_token.delete()
        return Response(status=HTTP_200_OK)




