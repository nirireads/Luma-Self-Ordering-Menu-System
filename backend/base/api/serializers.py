from django.http import HttpResponse
from rest_framework import serializers
from base.models import Table, Order, DishModel, WaiterModel, OrderBackupModel, CustomerOrderModel


from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = DishModel
        fields = '__all__'
     
class WaiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaiterModel
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    menu_item = serializers.PrimaryKeyRelatedField(queryset=DishModel.objects.all())

    class Meta:
        model = Order
        fields = '__all__'

class OrderBackupSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderBackupModel
        fields = '__all__'
     
class CustomerOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerOrderModel
        fields = '__all__'
