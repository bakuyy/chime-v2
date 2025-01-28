from django.urls import path
from .views import list_create_interactions

urlpatterns = [
    path('interactions/', list_create_interactions, name='list_create_interactions'),
]
