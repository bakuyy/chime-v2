from rest_framework import serializers
from .models import UserInteraction

class UserInteractionSerializer(serializers.ModelSerializer):
    class Meta:
        interaction = UserInteraction
        fields = ["user","song","interaction_type", "timestamp"]