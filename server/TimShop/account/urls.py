from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import (
    RegisterView,
    UserViewSet,
    UserLoginAPIView,
    LogoutView
)

router = routers.DefaultRouter()
router.register('users', UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/',UserLoginAPIView.as_view(),name='login'),
    path('token-auth/', obtain_jwt_token, name='create-token'),
    # path('token-refresh',refresh_jwt_token, name='refresh-token'),
    path('logout/', LogoutView.as_view(), name='logout'),

]