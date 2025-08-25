from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.conf import settings
from .models import Song
from recommender.models import UserInteraction
from recommender.utils import get_recommendations
import logging
import json

logger = logging.getLogger('music_app.views')


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
        
        # Get recommendations if user is authenticated
        if request.user.is_authenticated:
            recommended_songs = get_recommendations(request.user)
            recommended_serializer = SongSerializer(recommended_songs, many=True)
            return Response({
                'songs': serializer.data,
                'recommendations': recommended_serializer.data
            })
        
        return Response(serializer.data)

class SongInteractionView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, song_id):
        try:
            # Log the raw request data
            logger.debug(f"Raw request data: {request.body.decode('utf-8')}")
            logger.debug(f"Request headers: {dict(request.headers)}")
            
            song = Song.objects.get(id=song_id)
            interaction_type = request.data.get('interaction_type', 'play')
            
            logger.info(f"Processing {interaction_type} interaction for song: {song.song_name} (ID: {song_id})")
            logger.info(f"User: {request.user} (Authenticated: {request.user.is_authenticated})")
            logger.info(f"Request data: {json.dumps(request.data, indent=2)}")
            
            try:
                # Create interaction record
                interaction = UserInteraction.objects.create(
                    user=request.user if request.user.is_authenticated else None,
                    song_id=song,
                    artist_name=song.artist_name,
                    genre=song.genre,
                    interaction_type=interaction_type
                )
                logger.info(f"Successfully created interaction record:")
                logger.info(f"  - Interaction ID: {interaction.id}")
                logger.info(f"  - Song: {song.song_name}")
                logger.info(f"  - Artist: {song.artist_name}")
                logger.info(f"  - Type: {interaction_type}")
                
                return Response({
                    'status': 'success',
                    'interaction_id': interaction.id,
                    'song_name': song.song_name,
                    'interaction_type': interaction_type
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                logger.error(f"Failed to create interaction record:", exc_info=True)
                logger.error(f"Error details: {str(e)}")
                return Response({
                    'error': 'Failed to create interaction',
                    'detail': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except Song.DoesNotExist:
            logger.error(f"Song not found - ID: {song_id}")
            return Response({'error': 'Song not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Unexpected error processing interaction:", exc_info=True)
            logger.error(f"Error details: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
