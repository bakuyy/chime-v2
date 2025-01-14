from django.db import models

# Create your models here.
class Song(models.Model):
    song_name=models.CharField(max_length=100)
    artist_name = models.CharField(max_length=50)
    genre = models.CharField(blank=True)
    hashtags = models.TextField(blank=True,null=True)
    audio_file = models.FileField()

class Playlist(models.Model):
    title = models.CharField(max_length=100)
    date_created = models.DateTimeField()
    songs = models.ManyToManyField(Song, related_name="playlist songs")

class SongSpecs(models.Model):
    tempo = models.IntegerField(blank=True)
    danceability = models.IntegerField(blank=True)
    energy = models.IntegerField(blank=True)
    valence = models.IntegerField(blank=True)



