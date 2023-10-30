from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


def upload_path(instance, filename):
    return '/'.join(['covers', str(instance.title) or str(instance.name), filename])


class WaiterModel(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    contact_no = models.CharField(max_length=10)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username


def menu_upload_path(instance, filename):
    return '/'.join(['menuImage', str(instance.name), filename])

class DishModel(models.Model):
    MENU_CATEGORY_CHOICES = [
        ('appetizers', 'Appetizers'),
        ('main_course', 'Main Course'),
        ('desserts', 'Desserts'),
        ('beverages', 'Beverages'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('unavailable', 'Unavailable'),
    ]
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    counter = models.PositiveIntegerField(default='0')
    menu_category = models.CharField(max_length=100, choices=MENU_CATEGORY_CHOICES, default='Main Course')
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Available')
    cover = models.ImageField(blank=True, null=True, upload_to=menu_upload_path, max_length=300)
    description = models.TextField(default="description not available")

    def __str__(self):
        return self.name




#===================================================================#

class Table(models.Model):
    TABLE_STATES = [
        ('Empty', 'Empty'),
        ('Dining', 'Dining'),
    ]
    ORDER_STATES = [
        ('All','All'),
        ('Order','Order'),
        ('Cook','Cook'),
        ('Prepared','Prepared'),
        ('Served','Served'),
    ]
    table_no = models.IntegerField(unique=True)
    state = models.CharField(max_length=50, choices=TABLE_STATES, default='Empty')
    order_state = models.CharField(max_length=50, choices=ORDER_STATES, default='All')

    def __str__(self):
        return f"Table {self.table_no} ({self.state})"

class Order(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    menu_item = models.ForeignKey(DishModel, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    order_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order for Table {self.table.table_no}: {self.menu_item.name}"


class CustomerOrderModel(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    menu_item = models.ForeignKey(DishModel, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    order_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order for Table {self.table.table_no}: {self.menu_item.name}"

class OrderBackupModel(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    menu_item = models.ForeignKey(DishModel, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    order_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order for Table {self.table.table_no}: {self.menu_item.name}"



#===================================================================#
# class RestaurantModel(models.Model):
#     num_of_tables = models.IntegerField()
#     contact_no = models.CharField(max_length=10)

#     def __str__(self):
#         return f"{self.num_of_tables} tables"