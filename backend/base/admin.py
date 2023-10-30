from django.contrib import admin
from .models import Table, Order, DishModel, WaiterModel, OrderBackupModel, CustomerOrderModel

admin.site.register(Table)
admin.site.register(Order)
admin.site.register(DishModel)
admin.site.register(WaiterModel)
admin.site.register(OrderBackupModel)
admin.site.register(CustomerOrderModel)
