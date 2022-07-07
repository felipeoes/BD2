from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from museu.views import *

router = routers.DefaultRouter()
router.register('artistas', ArtistasViewSet, basename='Artistas')
router.register('colecoes', ColecoesViewSet, basename='Colecoes')
router.register('emprestados', EmprestadosViewSet, basename='Emprestados')
router.register('esculturas', EsculturasViewSet, basename='Esculturas')
router.register('exposicoes', ExposicoesViewSet, basename='Exposicoes')
router.register('expostoem', ExpostoemViewSet, basename='Expostoem')
router.register('objetosarte', ObjetosArteViewSet, basename='ObjetosArte')
router.register('outros', OutrosViewSet, basename='Outros')
router.register('permanentes', PermanentesViewSet, basename='Permanentes')
router.register('pinturas', PinturasViewSet, basename='Pinturas')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('objetos-arte/<str:type>/',
         get_art_objects_by_type_view, name='objetos-arte-tipo')
]
