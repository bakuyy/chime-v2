from django.db import models
from django.contrib.auth.models import User
from music_app.models import Song
from django.utils import timezone

class UserInteraction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    song_id = models.ForeignKey(Song, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=50, default='Unknown Artist')  
    genre = models.JSONField(blank=True, default=list)
    interaction_type = models.CharField(max_length=50, default='')  
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ('user', 'song_id', 'interaction_type')

