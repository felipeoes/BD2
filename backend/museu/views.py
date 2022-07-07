from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets

from .serializers import *
from museu.queries import *

class ArtistasViewSet(viewsets.ModelViewSet):
    queryset = Artista.objects.all()
    serializer_class = ArtistasSerializer
    
class ColecoesViewSet(viewsets.ModelViewSet):
    queryset = Colecao.objects.all()
    serializer_class = ColecoesSerializer
    
    
class EmprestadosViewSet(viewsets.ModelViewSet):
    queryset = Emprestados.objects.all()
    serializer_class = EmprestadosSerializer
    

class EsculturasViewSet(viewsets.ModelViewSet):
    queryset = Esculturas.objects.all()
    serializer_class = EsculturasSerializer
    
class ExposicoesViewSet(viewsets.ModelViewSet):
    queryset = Exposicoes.objects.all()
    serializer_class = ExposicoesSerializer

class ExpostoemViewSet(viewsets.ModelViewSet):
    queryset = Expostoem.objects.all()
    serializer_class = ExpostoemSerializer
    
class ObjetosArteViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer
    
class OutrosViewSet(viewsets.ModelViewSet):
    queryset = Outros.objects.all()
    serializer_class = OutrosSerializer

class PermanentesViewSet(viewsets.ModelViewSet):
    queryset = Permanentes.objects.all()
    serializer_class = PermanentesSerializer
    
class PinturasViewSet(viewsets.ModelViewSet):
    queryset = Pinturas.objects.all()
    serializer_class = PinturasSerializer

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_art_objects_by_type_view(request, type):
    "Retorna todos os objetos de arte de um tipo específico"

    art_objects = get_art_objects_by_type(type)

    if not art_objects:
        return Response({"message": "Nenhum objeto de arte encontrado"}, status=404)

    return Response(art_objects)