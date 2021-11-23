from rest_framework.serializers import ModelSerializer
from .models import Canvas


class CanvasUpdateDrawingSerializer(ModelSerializer):
    class Meta:
        model = Canvas
        fields = ("drawing",)


class CanvasSerializer(ModelSerializer):
    class Meta:
        model = Canvas
        fields = (
            "id",
            "image_path",
            "drawing",
        )
