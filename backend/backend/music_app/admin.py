# music_app/admin.py
from django.contrib import admin
from .models import Song

admin.site.register(Song)
