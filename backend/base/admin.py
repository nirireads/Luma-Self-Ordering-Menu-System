from django.contrib import admin
# from .models import Note, DetailsModel, RestaurantModel, DishModel, OrderModel, WaiterModel, OrderItem, Book
from .models import Table, Order, DishModel



admin.site.register(Table)
admin.site.register(Order)


# admin.site.register(Note)
# admin.site.register(DetailsModel)
# admin.site.register(RestaurantModel)
admin.site.register(DishModel)
# admin.site.register(OrderModel)
# admin.site.register(WaiterModel)
# admin.site.register(OrderItem)
# admin.site.register(Book)