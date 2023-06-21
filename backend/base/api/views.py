from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import permission_required, login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.contrib.auth import authenticate, login


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# from base.models import Note
# from .serializers import NoteSerializer

# from base.models import DetailsModel
# from .serializers import DetailsSerializer

from base.models import DishModel
from .serializers import DishSerializer


# from base.models import WaiterModel
# from .serializers import WaiterSerializer

# from base.models import Book
# from .serializers import BookSerializer


# ===============================================================================================

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from base.models import Table, Order
from .serializers import TableSerializer, OrderSerializer


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

# Get Table


@api_view(['GET'])
def get_table(request):
    tables = Table.objects.all()
    serializer = TableSerializer(tables, many=True)
    return Response(serializer.data)


# Get Order
@api_view(['GET'])
def get_order(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# Add Order
@api_view(['POST'])
def add_order(request):
    table_no = request.data.get('table')
    menu_item_id = request.data.get('menuItem')
    counter = request.data.get('quantity')

    response_data = {'table_no': table_no,
                     'menu_item_id': menu_item_id, 'counter': counter}
    print(response_data)
    try:
        table = Table.objects.get(table_no=table_no)
        menu_item = DishModel.objects.get(id=menu_item_id)

        order, created = Order.objects.get_or_create(
            table=table, menu_item=menu_item)
        if created:
            order.counter = counter
        else:
            order.counter = counter
        order.save()

        # === delete =========
        if (counter == 0):
            order.delete()
            table.state = 'Empty'
        else:
            # Update the table state
            table.state = 'Dining'
        table.save()

        return Response({'success': True}, status=status.HTTP_200_OK)

    except Table.DoesNotExist:
        return Response({'success': False, 'message': 'Table does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except DishModel.DoesNotExist:
        return Response({'success': False, 'message': 'Dish does not exist.'}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    # =======================================================


# class BookViewSet(APIView):
#     queryset = Book.objects.all()
#     serializer_class = BookSerializer

#     def post(self, request, *args, **kwargs):
#         cover = request.data['cover']
#         title = request.data['title']

#         print(title)

#         Book.objects.create(title=title, cover=cover)
#         return HTTPResponse({'message': 'Book Created'}, status=200)


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


# class DetailsTable(APIView):
#     def get(self, request):
#         detailsObj = DetailsModel.objects.all()
#         dlSerializeObj = DetailsSerializer(detailsObj, many=True)
#         return Response(dlSerializeObj.data)

#     def post(self, request):
#         serializeObj = DetailsSerializer(data=request.data)
#         if serializeObj.is_valid():
#             serializeObj.save()
#             return Response({'message': 'Data saved successfully'})
#         else:
#             return Response(serializeObj.errors)


# class DetailsUpdate(APIView):
#     def post(self, request, pk):
#         try:
#             detailsObj = DetailsModel.objects.get(pk=pk)

#             serializeObj = DetailsSerializer(detailsObj, data=request.data)
#             if serializeObj.is_valid():
#                 serializeObj.save()
#                 return Response(200)
#             else:
#                 return Response(serializeObj.errors)
#         except:
#             return Response("Not Found In Database")


# class DetailsDelete(APIView):
#     def post(self, request, pk):
#         try:
#             detailsObj = DetailsModel.objects.get(pk=pk)
#             detailsObj.delete()
#             return Response(200)
#         except:
#             return Response("Not Found In Database")


# ==== ADDING , UPDATE, DELETE -> DISH  ==== #
class DishTable(APIView):
    def get(self, request):
        dishObj = DishModel.objects.all()
        dishSerializeObj = DishSerializer(dishObj, many=True)
        return Response(dishSerializeObj.data)

    def post(self, request, *args, **kwargs):
        name = request.data['name']
        price = request.data['price']
        menu_category = request.data['menu_category']
        status = request.data['status']
        description = request.data['description']
        cover = request.data['cover']

        dishSerializeObj = DishSerializer(data=request.data)
        print(dishSerializeObj)
        if (dishSerializeObj.is_valid()):
            print("it is valid")
            # dishSerializeObj.save()
            DishModel.objects.create(name=name, price=price,
                                     menu_category=menu_category, description=description, cover=cover, status=status)
            return Response({'message': 'Dish Added Successfully'})
        else:
            print("not valid")
            return Response(dishSerializeObj.errors)


class DishTableDelete(APIView):
    def delete(self, request, pk):
        try:
            dishSerializeObj = DishModel.objects.get(pk=pk)
            dishSerializeObj.delete()
            return Response(200)
        except:
            return Response("Not Found In Database")


class DishTableUpdate(APIView):
    def put(self, request, pk):
        try:
            dishObj = DishModel.objects.get(pk=pk)
            print(dishObj)
            serializerObj = DishSerializer(dishObj, data=request.data)
            if serializerObj.is_valid():
                serializerObj.save()
                return Response(serializerObj.data)
            return Response(serializerObj.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Not Found In Database")


# class WaiterUser(APIView):
#     def get(self, request):
#         waiterObj = WaiterModel.objects.all()
#         waiterSerializeObj = WaiterSerializer(waiterObj, many=True)
