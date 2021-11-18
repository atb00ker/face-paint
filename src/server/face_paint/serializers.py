from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Canvas
from server.users.serializers import SignUpSerializer

class CanvasSerializer(ModelSerializer):
    username = serializers.CharField(max_length=128)

    class Meta:
        model = Canvas
        fields = (
            'id',
            'image_path',
            'username',
        )
