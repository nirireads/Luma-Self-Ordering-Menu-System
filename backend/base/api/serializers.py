from django.http import HttpResponse
from rest_framework import serializers
# from base.models import Note, DetailsModel, RestaurantModel, DishModel, OrderModel, WaiterModel, OrderItem, Book
from base.models import Table, Order, DishModel


from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

# ==============================================

# class BookSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Book
#         fields = ['title', 'cover']



# class NoteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Note
#         fields = '__all__'


# class DetailsSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DetailsModel
#         fields = '__all__'

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = DishModel
        fields = '__all__'
     
# class RestaurantSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RestaurantModel
#         fields = '__all__'

# class WaiterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = WaiterModel
#         fields = '__all__'

# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderModel
#         fields = '__all__'

# class OrderItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = OrderItem
#         fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'



class OrderSerializer(serializers.ModelSerializer):
    menu_item = serializers.PrimaryKeyRelatedField(queryset=DishModel.objects.all())

    class Meta:
        model = Order
        fields = '__all__'
     
    

