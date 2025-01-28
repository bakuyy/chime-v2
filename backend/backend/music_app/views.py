from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.conf import settings
from .models import Song


class SongUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['song_name', 'artist_name', 'genre', 'hashtags', 'audio_file']
    
    def create(self,validated_data):
        song = Song.objects.create(**validated_data)
        return song

class SongUploadView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        serializer = SongUploadSerializer(data=request.data)
        if serializer.is_valid():
                # save new song instance
                serializer.save()

                # successful
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SongSerializer(serializers.ModelSerializer):
    audio_file_url = serializers.SerializerMethodField()

    class Meta:
        model = Song
        fields = ['id', 'song_name', 'artist_name', 'genre', 'hashtags', 'audio_file', 'audio_file_url']

    def get_audio_file_url(self, obj):
        # Generate the absolute URL for the audio file
        if obj.audio_file:
            return settings.MEDIA_URL + str(obj.audio_file)
        return None
    

class SongListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        songs = Song.objects.all()  
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)