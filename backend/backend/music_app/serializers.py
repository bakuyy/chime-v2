from rest_framework import serializers
from .models import SongSpecs, Playlist, Song, Hashtag
from django.conf import settings


class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = ["tag"]

class SongSerializer(serializers.ModelSerializer):
    hashtags = HashtagSerializer(many=True)
    class Meta:
        model = Song
        fields = ["song_name", "artist_name","genre", "hashtags", "audio_file"]
        # or fields=["__all__"]

        def create(self, validated_data):

            song = Song.objects.create(**validated_data)

            hashtags_data = validated_data.pop('hashtags',[]) # will return empty array by default if hashtags doesn't exist
            for hashtag_data in hashtags_data:
                hashtag, _ = Hashtag.objects.get_or_create(name=hashtag_data["tag"])
                song.hashtags.add(hashtag)

            return song
        def get_audio_file(self, obj):
        # Return the full URL to the audio file
            return settings.MEDIA_URL + 'songs/' + obj.audio_file.name.split('songs/')[1]



class SongSpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SongSpecs
        fields = ["__all__"]

class PlaylistSerializer(serializers.ModelSerializer):
    hashtags = HashtagSerializer(many= True)
    songs = SongSerializer(many=True)
    class Meta:
        model = Playlist
        fields = ["__all__"]
    
    def create(self, validated_data):
        playlist = Playlist.objects.create(**validated_data)

        hashtags_data = validated_data.pop('hashtags',[])

        for hashtag_data in hashtags_data:
                hashtag, _ = Hashtag.objects.get_or_create(name=hashtag_data["tag"])
                playlist.hashtags.add(hashtag)
        return playlist
    
    def update(self, instance, validated_data):
        songs_data = validated_data.pop("songs",[])
        # updates the fields that aren't affected (i.e hashtags)
        instance = super().update(instance, validated_data)

        if songs_data:
            #get current songs in the playlist
            curr_song_ids = instance.songs.values_list("id", flat=True)
            new_song_ids = {song_data['id'] for song_data in songs_data}

            for song_data in songs_data:
                if song_data["id"] not in curr_song_ids:
                    song = Song.objects.get(id=song_data["id"])
                    instance.songs.add(song)
            
            for song_id in curr_song_ids:
                if song_id not in new_song_ids:
                    song = Song.objects.get(id=song_id)
                    instance.songs.remove(song)

        return instance



    
