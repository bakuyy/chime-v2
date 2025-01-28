from rest_framework import serializers
from .models import UserProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated  
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["profile_desc", "preferred_genres"]
    
    def create(self, validated_data):
        user = self.context['request'].user
        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):
        instance.profile_desc = validated_data.get('profile_desc', instance.profile_desc)
        instance.preferred_genres = validated_data.get('preferred_genres', instance.preferred_genres)
        instance.save()
        return instance


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # only authenticated users can access this view

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"detail": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        user = request.user
        #  try to get an existing profile
        user_profile = UserProfile.objects.filter(user=user).first()

        # if the profile exists, update it
        if user_profile:
            serializer = UserProfileSerializer(user_profile, data=request.data)
            if serializer.is_valid():
                serializer.save()  #update profile
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # if no profile exists, create a new one
            serializer = UserProfileSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()  
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        # finally, if the validation fails, return error response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
