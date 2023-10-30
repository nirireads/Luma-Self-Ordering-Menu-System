from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import OrderStatistics
from .views import CustomerOrderListView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    #Admin Authentication   
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dish
    path('dish/',views.Dish.as_view()),
    path('dish/<int:pk>', views.Dish.as_view()),
    
    # Waiter 
    path('authenticate/', views.authenticate_waiter, name='authenticate_waiter'),
    path('waiter/', views.Waiter.as_view(), name='get_waiter'),
    path('waiter/<int:pk>', views.Waiter.as_view(), name='edit and delete waiter'),

    # Table
    path('gettable/', views.get_table, name='get_table'),
    path('table/update/<int:table_id>/', views.update_table_order_state, name='update_table_order_state'),

    # Order
    path('getorder/', views.get_order, name='get_order'),
    path('getorder/<int:tableNo>/', views.get_order_bytable, name='get_order_bytable'),
    path('addorder/', views.add_order, name='add_order'),
    path('addorder/add/', views.add_order_all, name='add_order_all'),
    path('delete-order/<int:order_id>/', views.delete_order, name='delete-order'),

     # CRUD operations for the CustomerOrderModel
    path('customer_orders/', views.get_customer_orders, name='get_customer_orders'),
    path('customer_orders/add/', views.add_customer_order, name='add_customer_order'),
    path('customer_orders/update/<int:order_id>/', views.update_customer_order, name='update_customer_order'),
     path('customer_orders/delete/', views.delete_customer_order_all, name='delete_customer_order_all'),
    path('customer_orders/delete/<int:order_id>/', views.delete_customer_order, name='delete_customer_order'),
    path('customer_orders_table/', CustomerOrderListView.as_view(), name='customer-order-list'),

    # Order Backup
    path('order-backup/', views.create_order_backup, name='create-order-backup'),

    # Report 
    path('order-statistics/', OrderStatistics.as_view(), name='order-statistics'),
    path('table-statistics/', views.TableStatistics, name='table_statistics'),
    path('popular-items/revenue/<str:month>/<int:year>/', views.get_popular_items_by_revenue, name='get-popular-items'),
    path('popular-items/frequency/<str:month>/<int:year>/', views.get_popular_items_by_frequency, name='get-popular-items'),
    path('total-revenue/<str:month>/<int:year>/', views.get_total_revenue, name='get-total-revenue'),
]

