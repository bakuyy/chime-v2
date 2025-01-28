from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from .models import UserInteraction
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt

class UserInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInteraction
        fields = ["song_id", "artist_name","genre", "interaction_type"]

@permission_classes([AllowAny])
@api_view(['POST'])
def list_create_interactions(request):
    if request.method == 'POST':
        serializer = UserInteractionSerializer(data=request.data)

        # validate incoming data
        if serializer.is_valid():
            interaction = serializer.save()
            return Response({"id": interaction.id}, status=HTTP_201_CREATED)

        # error for failed validation
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
