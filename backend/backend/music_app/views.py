from django.shortcuts import render
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
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