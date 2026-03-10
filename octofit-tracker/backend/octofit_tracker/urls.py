"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet, api_root

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'teams', TeamViewSet, basename='team')
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'leaderboard', LeaderboardViewSet, basename='leaderboard')
router.register(r'workouts', WorkoutViewSet, basename='workout')

# API endpoint format: https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
# Example: https://$CODESPACE_NAME-8000.app.github.dev/api/activities/
# $CODESPACE_NAME is dynamically set from the environment

def api_url_info(request):
    codespace_name = os.environ.get('CODESPACE_NAME', '[CODESPACE_NAME]')
    base_url = f'https://{codespace_name}-8000.app.github.dev' if codespace_name != '[CODESPACE_NAME]' else 'http://localhost:8000'
    return_url = f"API root. Example endpoint: {base_url}/api/activities/"
    from django.http import JsonResponse
    return JsonResponse({"info": return_url})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_url_info, name='api-root'),
]
