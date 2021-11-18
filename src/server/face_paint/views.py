import uuid

# REST Framework
from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Canvas App
from server.face_paint.serializers import CanvasSerializer
from .models import Canvas


# api/v1/image/
class FacePaintView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        username = request.user
        all_canvas = Canvas.objects.filter(username=username)
        serializer = CanvasSerializer(all_canvas, many=True)
        return Response(serializer.data)

    def post(self, request):
        img_path = request.data["image_path"]
        canvas_id = uuid.uuid4()
        new_canvas = {
            'image_path': img_path,
            'id': canvas_id,
            'username': str(request.user),
        }
        serializer = CanvasSerializer(data=new_canvas)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        canvas = Canvas.objects.create(
            username=request.user, image_path=img_path, id=canvas_id
        )
        canvas.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
