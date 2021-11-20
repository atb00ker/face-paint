import uuid
import json

# REST Framework
from rest_framework import serializers
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Canvas App
from server.canvas.serializers import CanvasSerializer
from .models import Canvas


# api/v1/image/
class CanvasView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        username = request.user
        all_canvas = Canvas.objects.filter(username=username)
        serializer = CanvasSerializer(all_canvas, many=True)
        return Response(serializer.data)

    def post(self, request):
        img_path = request.data["image_path"]
        drawing = json.loads(request.data["drawing"])
        canvas_id = uuid.uuid4()
        new_canvas = {
            'image_path': img_path,
            'id': canvas_id, 
            'username': str(request.user),
            'drawing': drawing,  
        }
        serializer = CanvasSerializer(data=new_canvas)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        canvas = Canvas.objects.create(username=request.user, image_path=img_path, drawing=drawing, id=canvas_id)
        canvas.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# api/v1/image/<canvas_id>
class CanvasWithIDView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)


    def get(self, request, *args, **kwargs):
        canvas_id = self.kwargs['canvas_id']
        all_canvas = Canvas.objects.filter(id=canvas_id)
        serializer = CanvasSerializer(all_canvas, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        img_path = request.data["image_path"]
        drawing = json.loads(request.data["drawing"])
        canvas_id = self.kwargs['canvas_id']
        new_canvas = { 
            'image_path': img_path,
            'id': canvas_id, 
            'username': str(request.user),
            'drawing': drawing, 
        }
        serializer = CanvasSerializer(data=new_canvas)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        canvas = Canvas.objects.filter(id=canvas_id)
        canvas.update(image_path=img_path, drawing=drawing)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
