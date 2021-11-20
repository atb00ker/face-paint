import uuid
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField


class Canvas(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    image_path = models.CharField(max_length=128)
    drawing = models.JSONField()
    username = models.ForeignKey(User, related_name='canvas', on_delete=models.CASCADE)
