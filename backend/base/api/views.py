import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.views.decorators.http import require_POST
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from base.models import DishModel, WaiterModel, Table, Order, OrderBackupModel, CustomerOrderModel
from .serializers import DishSerializer, WaiterSerializer, TableSerializer, OrderSerializer, OrderBackupSerializer, CustomerOrderSerializer


# ===============================================================================================



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     if request.user.is_authenticated:
#         user = request.user
#         notes = user.note_set.all()
#         serializer = NoteSerializer(notes, many=True)
#         print(serializer.data)
#         return Response(serializer.data)
#     else:
#         return Response(status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_details(request):
#     if request.user.is_authenticated:
#         user = request.user
#         data = {
#             'user_details': {
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#             }
#         }
#         return Response(data)
#     else:
#         return Response({'error': 'User is not authenticated'})

# ============== Table ================ #
@api_view(['GET'])
def get_table(request):
    tables = Table.objects.all()
    serializer = TableSerializer(tables, many=True)
    return Response(serializer.data)

from django.db import transaction

@csrf_exempt
def update_table_order_state(request, table_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_order_state = data.get('newOrderState')
            new_state = data.get('newState')

            # Retrieve the table instance
            table = Table.objects.get(id=table_id)

            if table:
                # Update the order_state if new_order_state is provided
                if new_order_state is not None:
                    table.order_state = new_order_state
        
                # Update the state if new_state is provided
                if new_state is not None:
                    table.state = new_state

                table.save()
                   
                return JsonResponse({'message': 'Table order state updated successfully'})
            else:
                return JsonResponse({'error': 'Table not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

# ============== Table ================ #



# ============== Order ================ #
@api_view(['GET'])
def get_order(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_order_bytable(request, tableNo):
    # Filter orders by the provided table number
    orders = Order.objects.filter(table=tableNo)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# Add Order
@api_view(['POST'])
def add_order_all(request):
    orders_data = request.data  # Assuming it's an array of orders

    try:
        for order_data in orders_data:
            table_no = order_data.get('table')
            menu_item_id = order_data.get('menuItem')
            counter = order_data.get('quantity')

            table = Table.objects.get(table_no=table_no)
            menu_item = DishModel.objects.get(id=menu_item_id)

            order, created = Order.objects.get_or_create(
                table=table, menu_item=menu_item)

            order.counter = counter
            order.save()

            # Update the table state to 'Dining'
            if counter > 0:
                table.state = 'Dining'
                table.order_state = 'Order'
            else:
                table.state = 'Empty'
                table.order_state = 'All'
            table.save()

        return Response({'success': True}, status=status.HTTP_200_OK)

    except Table.DoesNotExist:
        return Response({'success': False, 'message': 'Table does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except DishModel.DoesNotExist:
        return Response({'success': False, 'message': 'Dish does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_order(request):
    table_no = request.data.get('table')
    menu_item_id = request.data.get('menuItem')
    counter = request.data.get('quantity')

    try:
        table = Table.objects.get(table_no=table_no)
        menu_item = DishModel.objects.get(id=menu_item_id)

        order, created = Order.objects.get_or_create(
            table=table, menu_item=menu_item)

        order.counter = counter
        order.save()

        # Update the table state to 'Dining'
        if counter > 0:
            table.state = 'Dining'
            table.order_state = 'Order'
        else:
            table.state = 'Empty'
            table.order_state = 'All'
        table.save()

        return Response({'success': True}, status=status.HTTP_200_OK)

    except Table.DoesNotExist:
        return Response({'success': False, 'message': 'Table does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except DishModel.DoesNotExist:
        return Response({'success': False, 'message': 'Dish does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_order(request, order_id):
    try:
        order = Order.objects.get(pk=order_id)
        order.delete()
        return Response({'message': 'Order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# ============== Order ================ #



# ================= ADMIN AUTHENTICATION ===================#
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token.refresh',
    ]
    return Response(routes)
# ================= ADMIN AUTHENTICATION ===================#



# =========== M E N U =========== #
class Dish(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            try:
                dish = DishModel.objects.get(pk=pk)
                serializer = DishSerializer(dish)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except DishModel.DoesNotExist:
                return Response({'message': 'Dish not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            dishObj = DishModel.objects.all()
            dishSerializeObj = DishSerializer(dishObj, many=True)
            return Response(dishSerializeObj.data, status=status.HTTP_200_OK)

    def post(self, request):
        dishSerializeObj = DishSerializer(data=request.data)
        if dishSerializeObj.is_valid():
            dishSerializeObj.save()
            return Response({'message': 'Dish Added Successfully'}, status=status.HTTP_201_CREATED)
        return Response(dishSerializeObj.errors, status=status.HTTP_400_BAD_REQUEST)
    
  

    def delete(self, request, pk):
        try:
            dishObj = DishModel.objects.get(pk=pk)
            dishObj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except DishModel.DoesNotExist:
            return Response({'message': 'Dish not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            dishObj = DishModel.objects.get(pk=pk)
            serializerObj = DishSerializer(dishObj, data=request.data)
            if serializerObj.is_valid():
                serializerObj.save()
                return Response(serializerObj.data, status=status.HTTP_200_OK)
            return Response(serializerObj.errors, status=status.HTTP_400_BAD_REQUEST)
        except DishModel.DoesNotExist:
            return Response({'message': 'Dish not found'}, status=status.HTTP_404_NOT_FOUND)
# =========== M E N U =========== #




#================ Waiter ============================
class Waiter(APIView):
    def get(self, request):
        waiterObj = WaiterModel.objects.all()
        waiterSerializeObj = WaiterSerializer(waiterObj, many=True)
        return Response(waiterSerializeObj.data)

    def post(self, request):
        waiterSerializeObj = WaiterSerializer(data=request.data)
        if waiterSerializeObj.is_valid():
            waiterSerializeObj.save()
            return Response({'message': 'Data saved successfully'})
        else:
            return Response(waiterSerializeObj.errors)
    
    # def post(self, request):
    #     try:
    #         data = request.data.copy()
    #         # Hash the password before saving it
    #         data['password'] = make_password(data['password'])
    #         waiterSerializeObj = WaiterSerializer(data=data)
    #         if waiterSerializeObj.is_valid():
    #             waiterSerializeObj.save()
    #             return Response({'message': 'Data saved successfully'})
    #         else:
    #             return Response(waiterSerializeObj.errors, status=status.HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            waiterObj = WaiterModel.objects.get(pk=pk)
            print(waiterObj)
            serializerObj = WaiterSerializer(waiterObj, data=request.data)
            if serializerObj.is_valid():
                serializerObj.save()
                return Response(serializerObj.data)
            return Response(serializerObj.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Not Found In Database")

    def delete(self, request, pk):
        try:
            SerializeObj = WaiterModel.objects.get(pk=pk)
            SerializeObj.delete()
            return Response(200)
        except:
            return Response("Not Found In Database")

@csrf_exempt
@require_POST
def authenticate_waiter(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Retrieve waiter from the database based on the provided username
        try:
            waiter = WaiterModel.objects.get(username=username)
        except WaiterModel.DoesNotExist:
            waiter = None

        if waiter is not None and (password == waiter.password):
            # Password matches, consider the user authenticated
            return JsonResponse({'authenticated': True, 'user': {'username': waiter.username, 'contact_no': waiter.contact_no}}, status=200)
        else:
            return JsonResponse({'authenticated': False, 'error': 'Invalid credentials.'}, status=401)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400) 
    
#================ Waiter ============================ #



#================ Order Backup ============================ #
@api_view(['POST'])
def create_order_backup(request):
    try:
        serializer = OrderBackupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Order backup created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#================ Order Backup ============================ #

class OrderStatistics(APIView):
    def get(self, request):
        # Filter orders with the state 'Dining'
        dining_orders = Order.objects.filter(table__state='Dining')

        # Calculate the total number of 'Dining' orders
        total_dining_orders = dining_orders.count()

        # Calculate the total revenue for 'Dining' orders
        total_dining_revenue = sum(order.menu_item.price for order in dining_orders)

        # Create a response dictionary
        response_data = {
            "total_orders": total_dining_orders,
            "total_revenue": total_dining_revenue,
        }

        return Response(response_data, status=status.HTTP_200_OK)


def TableStatistics(request):
    try:
        # Count the tables with each order state
        order_count = Table.objects.filter(order_state='Order').count()
        cook_count = Table.objects.filter(order_state='Cook').count()
        prepared_count = Table.objects.filter(order_state='Prepared').count()
        served_count = Table.objects.filter(order_state='Served').count()

        # Return the statistics as JSON
        data = {
            'Order': order_count,
            'Cook': cook_count,
            'Prepared': prepared_count,
            'Served': served_count,
        }

        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    



# get pupulat item by revenue
from django.db.models import Sum, F
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

@api_view(['GET'])
def get_popular_items_by_revenue(request, month, year):
    month_number = datetime.strptime(month, '%B').month
    try:
        # Filter orders by month and year
        orders = OrderBackupModel.objects.filter(order_time__month=month_number, order_time__year=year)

        # Calculate revenue for each menu item and get the top 3 by revenue
        popular_items = orders.values(
            'menu_item__name',
            menu_item__cover=F('menu_item__cover'),  # Assuming your Dish model has a 'cover' field
        ).annotate(
            total_revenue=Sum(F('menu_item__price') * F('counter'))
        ).order_by('-total_revenue')[:3]

        return Response(popular_items, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from rest_framework.renderers import JSONRenderer

@api_view(['GET'])
def get_popular_items_by_frequency(request, month, year):
    month_number = datetime.strptime(month, '%B').month
    try:
        # Filter orders by month and year
        orders = OrderBackupModel.objects.filter(order_time__month=month_number, order_time__year=year)

        # Calculate frequency for each menu item and get the top 3 by frequency
        popular_items = orders.values(
            'menu_item__name',
            menu_item__cover=F('menu_item__cover'),  # Assuming your Dish model has a 'cover' field
        ).annotate(
            total_frequency=Sum('counter')
        ).order_by('-total_frequency')[:3]

        # Create a response with JSONRenderer
        response = Response(popular_items, status=status.HTTP_200_OK)
        response.accepted_renderer = JSONRenderer()  # Set the renderer to JSONRenderer
        return response
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
def get_total_revenue(request, month, year):
    try:
        # Convert month name to month number (e.g., 'January' to 1)
        month_number = datetime.strptime(month, '%B').month

        # Filter orders by month and year
        orders = OrderBackupModel.objects.filter(order_time__month=month_number, order_time__year=year)

        # Calculate total revenue
        total_revenue = sum(order.menu_item.price * order.counter for order in orders)

        return Response({'total_revenue': total_revenue}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# VIEWS FOR CUSTOMER #
@api_view(['GET'])
def get_customer_orders(request):
    customer_orders = CustomerOrderModel.objects.all()
    serializer = CustomerOrderSerializer(customer_orders, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_customer_order(request):
    table_no = request.data.get('table')
    menu_item_id = request.data.get('menuItem')
    counter = request.data.get('quantity')

    try:
        table = Table.objects.get(table_no=table_no)
        menu_item = DishModel.objects.get(id=menu_item_id)

        customer_order, created = CustomerOrderModel.objects.get_or_create(
            table=table, menu_item=menu_item)

        customer_order.counter = counter
        customer_order.save()

        # Update the table state to 'Dining'
        if counter > 0:
            table.state = 'Dining'
            table.order_state = 'Order'
        else:
            table.state = 'Empty'
            table.order_state = 'All'
        table.save()

        return Response({'success': True}, status=status.HTTP_200_OK)

    except Table.DoesNotExist:
        return Response({'success': False, 'message': 'Table does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except DishModel.DoesNotExist:
        return Response({'success': False, 'message': 'Dish does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_customer_order(request, order_id):
    try:
        customer_order = CustomerOrderModel.objects.get(pk=order_id)
        new_counter = request.data.get('newCounter')

        if new_counter is not None:
            customer_order.counter = new_counter
            customer_order.save()

            return Response({'message': 'Customer order updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid input for counter'}, status=status.HTTP_400_BAD_REQUEST)

    except CustomerOrderModel.DoesNotExist:
        return Response({'error': 'Customer order not found'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_customer_order(request, order_id):
    try:
        customer_order = CustomerOrderModel.objects.get(pk=order_id)
        customer_order.delete()
        return Response({'message': 'Customer order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CustomerOrderModel.DoesNotExist:
        return Response({'error': 'Customer order not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def delete_customer_order_all(request):
    try:
        # Get a list of order IDs to delete from the request's JSON data
        order_ids_to_delete = request.data.get('order_ids', [])

        # Check if there are any order IDs to delete
        if not order_ids_to_delete:
            return Response({'error': 'No order IDs provided for deletion'}, status=status.HTTP_400_BAD_REQUEST)

        # Use bulk delete to delete multiple customer orders at once
        deleted_count, _ = CustomerOrderModel.objects.filter(pk__in=order_ids_to_delete).delete()

        return Response({'message': f'{deleted_count} customer orders deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class CustomerOrderListView(generics.ListAPIView):
    serializer_class = CustomerOrderSerializer

    def get_queryset(self):
        table_number = self.request.query_params.get('table')
        if table_number is not None:
            return CustomerOrderModel.objects.filter(table=table_number)
        return CustomerOrderModel.objects.all()
