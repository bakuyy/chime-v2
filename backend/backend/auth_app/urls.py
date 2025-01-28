from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.UserRegistrationView.as_view(), name="register"),
    path('user-profile/', views.UserProfileView.as_view(), name='user-profile'),

]