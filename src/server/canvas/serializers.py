from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Canvas

class CanvasSerializer(ModelSerializer):

    class Meta:
        model = Canvas
        fields = (
            'id',
            'image_path',
            'drawing',
        )
