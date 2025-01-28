from django.db import models
from django.contrib.auth.models import User
from music_app.models import Song

class UserInteraction(models.Model):
    song_id = models.ForeignKey(Song, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=50, default='Unknown Artist')  
    genre = models.JSONField(blank=True, default=list)
    interaction_type =  models.CharField(max_length=50, default='')  
    # metadata = models.JSONField()

