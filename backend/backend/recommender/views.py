from rest_framework import serializers
from .models import UserInteraction

class UserInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        interaction = UserInteraction
        fields = ["user","song","interaction_type", "timestamp"]

from django.shortcuts import render
from django.http import JsonResponse
from .models import UserInteraction
import json

# Create your views here.

#only post method for now (since you can't "unlike")
def list_create_interactions(request):
    if request.method== 'POST':
        body = json.loads(request.body)

    #extracting data from request body
    user_id = body.get("user")
    song_id = body.get("song")
    interaction_type = body.get("interaction_type")

    #validate
    if not user_id or not song_id or not interaction_type:
        return JsonResponse({"error": "missing field"}, status = 400)
    
    interaction = UserInteraction.objects.create(
        user_id=user_id,
        song_id=song_id,
        interaction_type= interaction_type
    )
    return JsonResponse({"id":interaction.id}, status=201)