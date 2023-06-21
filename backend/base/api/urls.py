from django.urls import path
from . import views
from .views import MyTokenObtainPairView


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),

    # path('notes/', views.getNotes),
    # path('details/', views.DetailsTable.as_view()),
    # path('details/update/<int:pk>', views.DetailsUpdate.as_view()),
    # path('details/delete/<int:pk>', views.DetailsDelete.as_view()),

    # path('books/', views.BookViewSet.as_view()),

    # path('getuser/', UserDetails.as_view(), name='get_user'),


    path('dish/',views.DishTable.as_view()),
    path('dish/delete/<int:pk>', views.DishTableDelete.as_view()),
    path('dish/update/<int:pk>', views.DishTableUpdate.as_view()),
    
    path('gettable/', views.get_table, name='get_table'),

    # path('getuser/', views.get_user, name='get_user'),
    # path('user-details/', views.get_user_details, name='user-details'),

    path('getorder/', views.get_order, name='get_order'),
    path('addorder/', views.add_order, name='add_order'),
  
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]

