# music_app/admin.py
from django.contrib import admin
from .models import UserInteraction

admin.site.register(UserInteraction)
