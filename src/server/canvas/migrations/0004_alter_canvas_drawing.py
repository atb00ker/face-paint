# Generated by Django 3.2.9 on 2021-11-20 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("canvas", "0003_canvas_drawing"),
    ]

    operations = [
        migrations.AlterField(
            model_name="canvas",
            name="drawing",
            field=models.JSONField(),
        ),
    ]
