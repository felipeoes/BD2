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

# Rotas mais complexas
router.register('listaobjetos-tipo', ListaObjetosPorTipoViewSet,
                basename='ListaObjetosPorTipo')
router.register('listaobjetos-categoria', ListaObjetosPorCategoriaViewSet,
                basename='ListaObjetosPorCategoria')
# router.register('listaobjetos-colecao', ListaObjetosPorColecaoViewSet, basename='ListaObjetosPorColecao')
router.register('objetos-custo-total-ano',
                CustoTotalPorAnoObjetosViewSet, basename='CustoTotalPorAno')
router.register('objetos-custo-total-ano-tipo',
                CustoTotalPorAnoObjetosPorTipoViewSet, basename='CustoTotalPorAnoTipo')
router.register('objetos-custo-total-mes',
                CustoTotalPorMesObjetosViewSet, basename='CustoTotalPorMes')
router.register('objetos-custo-total-mes-tipo',
                CustoTotalPorMesObjetosPorTipoViewSet, basename='CustoTotalPorMesTipo')
router.register('objetos-quantidade-total-ano',
                QuantidadeObjetosPorAnoViewSet, basename='QuantidadeTotalPorAno')
router.register('objetos-quantidade-total-mes',
                QuantidadeObjetosPorMesViewSet, basename='QuantidadeTotalPorMes')

router.register('esquemas', EsquemaViewSet, basename='Esquemas')
router.register('opcoes-botoes', OpcoesBotoesDisponiveis,
                basename='OpcaoBotao')
router.register(
    'agrupamentos', AgrupamentoPorTipoAnoCategoriaViewSet, basename='Agrupamentos')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
