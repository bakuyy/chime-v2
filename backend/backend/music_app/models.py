from django.db import models

# Create your models here.

class Hashtag(models.Model):
    tag = models.CharField(max_length=50)

class Song(models.Model):
    song_name=models.CharField(max_length=100)
    artist_name = models.CharField(max_length=50)
    genre = models.JSONField(blank=True, default=list)
    hashtags = models.JSONField(blank=True, default=list)
    audio_file = models.FileField(upload_to='songs/')    
    def __str__(self):
        return f"{self.song_name} by {self.artist_name}"

class Playlist(models.Model):
    title = models.CharField(max_length=100)
    date_created = models.DateTimeField()
    hashtags = models.JSONField(blank=True, default=list)
    songs = models.ManyToManyField(Song)

class SongSpecs(models.Model):
    tempo = models.IntegerField(blank=True)
    danceability = models.IntegerField(blank=True)
    energy = models.IntegerField(blank=True)
    valence = models.IntegerField(blank=True)

