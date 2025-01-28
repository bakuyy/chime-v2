from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)  # Make it nullable for now
    profile_desc = models.CharField(max_length=200)
    preferred_genres = models.JSONField(blank=True, default=list)

    def __str__(self):
        return self.user.username if self.user else "No User"

