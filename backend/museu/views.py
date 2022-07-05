from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer

from museu.queries import *


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_all_artists_view(request):
    "Retorna todos os artistas"

    artists = get_all_artists()

    if not artists:
        return Response({"message": "Nenhum artista encontrado"}, status=404)

    return Response(artists)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_all_art_objects_view(request):
    "Retorna todos os objetos de arte"

    art_objects = get_all_art_objects()

    if not art_objects:
        return Response({"message": "Nenhum objeto de arte encontrado"}, status=404)

    return Response(art_objects)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_art_objects_by_type_view(request, type):
    "Retorna todos os objetos de arte de um tipo específico"

    art_objects = get_art_objects_by_type(type)

    if not art_objects:
        return Response({"message": "Nenhum objeto de arte encontrado"}, status=404)

    return Response(art_objects)