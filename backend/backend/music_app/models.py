from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.

class Hashtag(models.Model):
    tag = models.CharField(max_length=50)

class Song(models.Model):
    song_name=models.CharField(max_length=100)
    artist_name = models.CharField(max_length=50)
    genre = models.CharField(max_length=200, blank=True)
    hashtags = models.JSONField(blank=True, default=list)
    audio_file = models.FileField()

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

