from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('upload/', views.SongUploadView.as_view(), name='upload_song'),
    path('songs/', views.SongListView.as_view(), name='song-list'),
    path('songs/upload/', views.SongUploadView.as_view(), name='song-upload'),
    path('songs/<int:song_id>/interact/', views.SongInteractionView.as_view(), name='song-interaction'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
