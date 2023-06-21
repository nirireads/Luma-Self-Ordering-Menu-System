# Generated by Django 4.2.1 on 2023-05-14 16:57

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0007_remove_dishmodel_serving_time_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="Book",
        ),
        migrations.DeleteModel(
            name="DetailsModel",
        ),
        migrations.RemoveField(
            model_name="note",
            name="user",
        ),
        migrations.RemoveField(
            model_name="orderitem",
            name="dish",
        ),
        migrations.RemoveField(
            model_name="orderitem",
            name="order",
        ),
        migrations.RemoveField(
            model_name="ordermodel",
            name="dishes",
        ),
        migrations.DeleteModel(
            name="RestaurantModel",
        ),
        migrations.DeleteModel(
            name="WaiterModel",
        ),
        migrations.DeleteModel(
            name="Note",
        ),
        migrations.DeleteModel(
            name="OrderItem",
        ),
        migrations.DeleteModel(
            name="OrderModel",
        ),
    ]