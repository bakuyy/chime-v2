from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

import auth_app
import music_app

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth-app/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth-app/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("auth-app/", include("auth_app.urls")),
    path("music-app/", include("music_app.urls")),
    path("recommender/", include("recommender.urls")),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  
