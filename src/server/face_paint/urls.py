from django.contrib import admin
from django.urls import path

from server.face_paint.views import FacePaintView

app_name = "face_paint"
urlpatterns = [
    path("face_paint/", FacePaintView.as_view(), name="face_paint"),
]
