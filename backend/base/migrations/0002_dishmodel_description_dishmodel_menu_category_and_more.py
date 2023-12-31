# Generated by Django 4.2.1 on 2023-05-13 13:27

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="dishmodel",
            name="description",
            field=models.TextField(default="description not available"),
        ),
        migrations.AddField(
            model_name="dishmodel",
            name="menu_category",
            field=models.CharField(
                choices=[
                    ("appetizers", "Appetizers"),
                    ("main_course", "Main Course"),
                    ("desserts", "Desserts"),
                    ("beverages", "Beverages"),
                ],
                default="Main Course",
                max_length=100,
            ),
        ),
        migrations.AddField(
            model_name="dishmodel",
            name="serving_time",
            field=models.PositiveIntegerField(default=5),
        ),
        migrations.AddField(
            model_name="dishmodel",
            name="status",
            field=models.CharField(
                choices=[("available", "Available"), ("unavailable", "Unavailable")],
                default="Available",
                max_length=100,
            ),
        ),
        migrations.AlterField(
            model_name="dishmodel",
            name="id",
            field=models.BigAutoField(
                auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
            ),
        ),
    ]
