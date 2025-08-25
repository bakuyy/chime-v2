from django.db import models
from django.contrib.auth.models import User

class Song(models.Model):
    song_name = models.CharField(max_length=100)
    artist_name = models.CharField(max_length=100)
    genre = models.JSONField(blank=True, default=list)
    hashtags = models.JSONField(blank=True, default=list)
    audio_file = models.FileField(upload_to='songs/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.song_name} by {self.artist_name}"

class Hashtag(models.Model):
    hashtag_name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.hashtag_name

class SongSpecs(models.Model):
    song = models.OneToOneField(Song, on_delete=models.CASCADE, related_name='specs')
    duration = models.FloatField(help_text="Duration in seconds", default=0)
    bitrate = models.IntegerField(help_text="Bitrate in kbps", default=0)
    sample_rate = models.IntegerField(help_text="Sample rate in Hz", default=0)
    channels = models.IntegerField(help_text="Number of audio channels", default=0)
    
    def __str__(self):
        return f"Specs for {self.song.song_name}"

class Playlist(models.Model):
    playlist_name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    songs = models.ManyToManyField(Song, related_name='playlists')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.playlist_name} by {self.user.username}" 