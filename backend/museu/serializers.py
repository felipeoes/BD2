from rest_framework import serializers
from .models import *


class ArtistasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artista
        fields = '__all__'


class ColecoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colecao
        fields = '__all__'


class EmprestadosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emprestados
        fields = '__all__'


class EsculturasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Esculturas
        fields = '__all__'


class ExposicoesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exposicoes
        fields = '__all__'


class ExpostoemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expostoem
        fields = '__all__'


class ObjetosArteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObjetosArte
        fields = '__all__'


class OutrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outros
        fields = '__all__'


class PermanentesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permanentes
        fields = '__all__'


class PinturasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pinturas
        fields = '__all__'
        
        
        