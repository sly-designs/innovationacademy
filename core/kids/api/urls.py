from django.urls import path
from . import views
""" from .views import KidViews """

""" urlpatterns = [
    path('kids/', KidViews.as_view())
] """


urlpatterns = [
    path('kids/', views.ApiOverview, name='kids-api-overview'),
    path('kids/add_kid/', views.addKid, name='add-kid'),
    path('kids/all_kids/', views.getKids, name='get-all-kids'),
    path('kids/view_kid/<str:pk>/', views.getKid, name='get-a-kid'),
    path('kids/update_kid/<str:pk>/', views.updateKid, name='update-a-kid')
]
