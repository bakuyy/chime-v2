from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('upload/', views.SongUploadView.as_view(), name='upload_song'),

]
