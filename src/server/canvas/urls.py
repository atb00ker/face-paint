from django.contrib import admin
from django.urls import path

from server.canvas.views import CanvasView, CanvasWithIDView

app_name = "canvas"
urlpatterns = [
    path("", CanvasView.as_view(), name="canvas_view"),
    path("<slug:canvas_id>", CanvasWithIDView.as_view(), name="canvas_with_id"),
]
