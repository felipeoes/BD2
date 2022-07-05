from django.contrib import admin
from django.urls import path, include

from museu import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('artistas/', views.get_all_artists_view, name='artistas'),
    path('objetos-arte/<str:type>/',
         views.get_art_objects_by_type_view, name='objetos-arte-tipo'),
]
