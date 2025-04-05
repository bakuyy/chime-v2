from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.conf import settings
from .models import Song
from recommender.models import UserInteraction
from recommender.utils import Recommender
import pandas as pd


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

class SongRecommendationView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, song_id):
        try:
            # Get the target song
            target_song = Song.objects.get(id=song_id)
            
            # Get all songs and their interactions
            songs = Song.objects.all()
            interactions = pd.DataFrame(list(UserInteraction.objects.all().values()))
            
            # Create recommender instance
            recommender = Recommender(interactions)
            
            # Get recommendations
            recommended_song_ids, scores = recommender.get_similar_songs(song_id)
            
            # Get the recommended songs
            recommended_songs = Song.objects.filter(id__in=recommended_song_ids)
            
            # Serialize the results
            serializer = SongSerializer(recommended_songs, many=True)
            
            # Add similarity scores to the response
            response_data = []
            for song, score in zip(serializer.data, scores):
                song['similarity_score'] = score['similarity_score']
                song['interaction_score'] = score['interaction_score']
                song['combined_score'] = score['combined_score']
                response_data.append(song)
            
            return Response(response_data)
            
        except Song.DoesNotExist:
            return Response({"error": "Song not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)