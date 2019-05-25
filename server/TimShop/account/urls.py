from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import (
    UserViewSet,
    UserLoginAPIView,
    LogoutView,
     ChangePasswordView
)

router = routers.DefaultRouter()
router.register('users', UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    # path('login/',UserLoginAPIView.as_view(),name='login'),
    path('login/', obtain_jwt_token, name='login'),
    # path('token-refresh',refresh_jwt_token, name='refresh-token'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/<int:pk>/change_password/', ChangePasswordView.as_view(), name='change_password')

]