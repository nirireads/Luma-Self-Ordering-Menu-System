from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# class Note(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     body = models.TextField()



# class DetailsModel(models.Model):
#     id = models.AutoField(primary_key=True)
#     name = models.CharField(max_length=100)
#     age = models.PositiveIntegerField()
#     city = models.CharField(max_length=100)
#     country = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name or ''






def upload_path(instance, filename):
    return '/'.join(['covers', str(instance.title) or str(instance.name), filename])


# class Book(models.Model):
#     title = models.CharField(max_length=32, blank=False)
#     cover = models.ImageField(blank=True, null=True, upload_to=upload_path)

#     def __str__(self):
#         return self.title or ''


# class RestaurantModel(models.Model):
#     num_of_tables = models.IntegerField()
#     contact_no = models.CharField(max_length=10)

#     def __str__(self):
#         return f"{self.num_of_tables} tables"

# class WaiterModel(models.Model):
#     username = models.CharField(max_length=50, unique=True)
#     password = models.CharField(max_length=50)
#     contact_no = models.CharField(max_length=10)
#     is_active = models.BooleanField(default=False)

#     def __str__(self):
#         return self.username




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
    # id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    # qty = models.PositiveIntegerField(validators=[MaxValueValidator(20)], max_length=2, default=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    # serving_time = models.PositiveIntegerField(default=5)
    counter = models.PositiveIntegerField(default='0')
    menu_category = models.CharField(max_length=100, choices=MENU_CATEGORY_CHOICES, default='Main Course')
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='Available')
    cover = models.ImageField(blank=True, null=True, upload_to=menu_upload_path, max_length=300)
    description = models.TextField(default="description not available")

    def __str__(self):
        return self.name



# class OrderModel(models.Model):
#     TABLE_CHOICES = [
#         ('T1', 'Table 1'),
#         ('T2', 'Table 2'),
#         ('T3', 'Table 3'),
#         ('T4', 'Table 4'),
#         ('T5', 'Table 5'),
#     ]

#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('processing', 'Processing'),
#         ('completed', 'Completed'),
#         ('cancelled', 'Cancelled'),
#     ]

#     PAYMENT_CHOICES = [
#         ('pending', 'Pending'),
#         ('paid', 'Paid'),
#     ]

#     # table_number = models.CharField(max_length=2, choices=TABLE_CHOICES)
#     order_status = models.CharField(max_length=255, choices=STATUS_CHOICES, default='pending')
#     payment_status = models.CharField(max_length=255, choices=PAYMENT_CHOICES, default='pending')
#     dishes = models.ManyToManyField(DishModel, related_name='orders')
#     # serving_time = models.PositiveIntegerField(default=0)

#     def __str__(self):
#         return f"Order {self.id}"

# class OrderItem(models.Model):
#     order = models.ForeignKey(OrderModel, on_delete=models.CASCADE)
#     dish = models.ForeignKey(DishModel, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)






#===================================================================#

class Table(models.Model):
    TABLE_STATES = [
        ('Empty', 'Empty'),
        ('Dining', 'Dining'),
    ]
    table_no = models.IntegerField(unique=True)
    state = models.CharField(max_length=50, choices=TABLE_STATES, default='Empty')

    def __str__(self):
        return f"Table {self.table_no} ({self.state})"

class Order(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE, null=True)
    menu_item = models.ForeignKey(DishModel, on_delete=models.CASCADE)
    counter = models.IntegerField(default=0)
    order_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Order for Table {self.table.table_no}: {self.menu_item.name}"




#===================================================================#
