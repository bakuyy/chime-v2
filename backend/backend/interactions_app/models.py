from django.db import models
from django.contrib.auth.models import User
from music_app.models import Song
# Create your models here.

class UserInteraction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # when the reference object is deleted, so are the objects that reference to it
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    interaction_type = ["chime","like","dislike"]
    timestamp = models.DateTimeField()
