from datetime import datetime
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes, APIView
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets

from django.db.models import Sum

from .serializers import *

from .create_fake_data import create_fake_data

# Emprestados.objects.filter(dataemprestimo__year=datetime(2017,1,1).year).delete()

# create_fake_data()


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

# Retorna o esquema de dados para cada modelo no tipo chave-valor, em que a chave é o nome da coluna e o valor é o tipo de dado.


def mapeia_tipo_dado(tipo: str):
    mapeamento = {
        "OneToOneField": "text",
        "ForeignKey": "text",
        "DateTimeField": "date",
        "DateField": "date",
        "CharField": "text",
        "FloatField": "number",
        "IntegerField": "number",
    }

    return mapeamento.get(tipo, tipo)


class EsquemaViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        tabelas = ['ObjetosArte', 'Permanentes', 'Pinturas', 'Esculturas',
                   'Outros', 'Emprestados', 'Exposicoes', 'Expostoem', 'Colecao', 'Artista']

        esquemas = {}
        for tabela in tabelas:
            esquemas[tabela] = {}
            for coluna in eval(tabela)._meta.get_fields():
                try:
                    esquemas[tabela].append({
                        coluna.name: mapeia_tipo_dado(
                            coluna.get_internal_type())
                    })
                except:
                    esquemas[tabela] = []
                    esquemas[tabela].append({
                        coluna.name: mapeia_tipo_dado(
                            coluna.get_internal_type())
                    })
        return Response(esquemas)


def converte_objeto_json(objeto):
    objeto_json = {}
    for coluna in objeto._meta.get_fields():
        try:
            objeto_json[coluna.name] = objeto.__getattribute__(coluna.name)
        except:
            pass
    return objeto_json

# Retorna listas de objetos de acordo com a categoria


class ListaObjetosPorCategoriaViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        categorias = ObjetosArte.objects.all().values_list(
            'catobjart', flat=True).distinct()

        listagem = {}
        for cat in categorias:
            objetos = ObjetosArte.objects.filter(catobjart=cat)
            listagem[cat] = [{
                "numid": objeto.numid,
                "titulo": objeto.titulo,
                "descricao": objeto.descricao,
                "tipoobjart": objeto.tipoobjart,
                "custo": objeto.custo
            }
                for objeto in objetos]
        return Response(listagem)


# Retorna listas de objetos de acordo com o tipo
class ListaObjetosPorTipoViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        tipos = ObjetosArte.objects.all().values_list(
            'tipoobjart', flat=True).distinct()
        listagem = {}
        for tipo in tipos:
            objetos = ObjetosArte.objects.filter(tipoobjart=tipo)

            listagem[tipo] = [
                {
                    "numid": objeto.numid,
                    "titulo": objeto.titulo,
                    "descricao": objeto.descricao,
                    "catobjart": objeto.catobjart,
                    "custo": objeto.custo
                }
                for objeto in objetos
            ]
        return Response(listagem)

# Retorna o custo total dos objetos comprados por ano


def gera_objetos_com_data():
    objetos = []
    # Gera uma tabela com os anos dos objetos de arte a partir das tabelas permanentes e emprestados
    for objeto in ObjetosArte.objects.all():
        if objeto.tipoobjart == 'Permanente':
            # Adiciona o ano do objeto permanente na tabela
            try:
                objeto.data = Permanentes.objects.get(
                    numobj5=objeto.numid).dataaquisicao
            except:
                pass
        elif objeto.tipoobjart == 'Emprestado':
            # Adiciona o ano do objeto emprestado na tabela
            try:
                objeto.data = Emprestados.objects.get(
                    numobj4=objeto.numid).dataemprestimo
            except:
                pass
        objetos.append(objeto)
    return objetos


class CustoTotalPorAnoObjetosViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        listagem = {}
        for ano in anos:
            custo = sum([objeto.custo for objeto in objetos if hasattr(
                objeto, 'data') and objeto.data.year == ano])
            listagem[ano] = custo

        todos = sum(
            [objeto.custo for objeto in objetos if hasattr(objeto, 'data')])
        listagem['TODOS'] = todos

        return Response(listagem)


class CustoTotalPorAnoObjetosPorTipoViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        tipos = [objeto.tipoobjart for objeto in objetos if hasattr(
            objeto, 'data')]
        tipos = list(set(tipos))
        tipos.sort()

        listagem = {}
        for ano in anos:
            for tipo in tipos:
                custo = sum([objeto.custo for objeto in objetos if hasattr(
                    objeto, 'data') and objeto.data.year == ano and objeto.tipoobjart == tipo])
                try:
                    listagem[ano][tipo] = custo
                except:
                    listagem[ano] = {}
                    listagem[ano][tipo] = custo

        todos = sum(
            [objeto.custo for objeto in objetos if hasattr(objeto, 'data')])
        listagem['TODOS'] = todos

        return Response(listagem)


class CustoTotalPorMesObjetosPorTipoViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        meses = [objeto.data.month for objeto in objetos if hasattr(
            objeto, 'data')]
        meses = list(set(meses))
        meses.sort()

        tipos = [objeto.tipoobjart for objeto in objetos if hasattr(
            objeto, 'data')]
        tipos = list(set(tipos))
        tipos.sort()

        listagem = {}
        for ano in anos:
            for mes in meses:
                for tipo in tipos:
                    custo = sum([objeto.custo for objeto in objetos if hasattr(
                        objeto, 'data') and objeto.data.year == ano and objeto.data.month == mes and objeto.tipoobjart == tipo])
                    try:
                        listagem[ano][mes][tipo] = custo
                    except:
                        listagem[ano] = {
                        } if not ano in listagem else listagem[ano]
                        listagem[ano][mes] = {
                        } if not mes in listagem[ano] else listagem[ano][mes]
                        listagem[ano][mes][tipo] = custo

        todos = sum(
            [objeto.custo for objeto in objetos if hasattr(objeto, 'data')])
        listagem['TODOS'] = todos

        return Response(listagem)

# Retorna o custo total dos objetos comprados por mês


class CustoTotalPorMesObjetosViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        # Gera uma tabela com os anos dos objetos de arte a partir das tabelas permanentes e emprestados
        objetos = gera_objetos_com_data()

        meses = [objeto.data.month for objeto in objetos if hasattr(
            objeto, 'data')]
        meses = list(set(meses))
        meses.sort()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        listagem = {}

        for ano in anos:
            for mes in meses:
                custo = sum([objeto.custo for objeto in objetos if hasattr(
                    objeto, 'data') and objeto.data.month == mes and objeto.data.year == ano])

                try:
                    listagem[ano][mes] = custo
                except:
                    listagem[ano] = {}
                    listagem[ano][mes] = custo

        todos = sum(
            [objeto.custo for objeto in objetos if hasattr(objeto, 'data')])
        listagem['TODOS'] = todos

        return Response(listagem)


class QuantidadeObjetosPorAnoViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        listagem = {}
        for ano in anos:
            quantidade = len([objeto for objeto in objetos if hasattr(
                objeto, 'data') and objeto.data.year == ano])
            listagem[ano] = quantidade

        todos = len(
            [objeto for objeto in objetos if hasattr(objeto, 'data')])
        listagem['TODOS'] = todos

        return Response(listagem)


class QuantidadeObjetosPorMesViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        meses = [objeto.data.month for objeto in objetos if hasattr(
            objeto, 'data')]
        meses = list(set(meses))
        meses.sort()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        listagem = {}
        for ano in anos:
            for mes in meses:
                quantidade = len([objeto for objeto in objetos if hasattr(
                    objeto, 'data') and objeto.data.month == mes and objeto.data.year == ano])
                try:
                    listagem[ano][mes] = quantidade
                except:
                    listagem[ano] = {}
                    listagem[ano][mes] = quantidade

        todos = len(
            [objeto for objeto in objetos if hasattr(objeto, 'data')])
        listagem['TODOS'] = todos

        return Response(listagem)


class OpcoesBotoesDisponiveis(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        tipos = [objeto.tipoobjart for objeto in objetos if hasattr(
            objeto, 'data')]

        tipos = list(set(tipos))
        tipos.sort()
        tipos.append('TODOS')

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()
        anos.append('TODOS')

        categorias = [objeto.catobjart for objeto in objetos if hasattr(
            objeto, 'data')]
        categorias = list(set(categorias))
        categorias.sort()
        categorias.append('TODOS')

        data = {
            1: {
                'label': 'tipo',
                'opcoes': tipos
            },
            2: {
                'label': 'ano',
                'opcoes': anos
            },
            3: {
                'label': 'categoria',
                'opcoes': categorias
            }
        }

        return Response(data)


def format_month(month: int):
    # Corrige o mês para dois algarismos se for menor que 10

    if isinstance(month, int):
        if month < 10:
            return '0' + str(month)
        else:
            return str(month)
    else:
        if len(month) == 1:
            return '0' + month
        else:
            return month


class AgrupamentoPorTipoAnoCategoriaViewSet(viewsets.ModelViewSet):
    queryset = ObjetosArte.objects.all()
    serializer_class = ObjetosArteSerializer

    def list(self, request):
        objetos = gera_objetos_com_data()

        anos = [objeto.data.year for objeto in objetos if hasattr(
            objeto, 'data')]
        anos = list(set(anos))
        anos.sort()

        meses = [objeto.data.month for objeto in objetos if hasattr(
            objeto, 'data')]
        meses = list(set(meses))
        meses.sort()

        tipos = [objeto.tipoobjart for objeto in objetos if hasattr(
            objeto, 'data')]
        tipos = list(set(tipos))
        tipos.sort()

        categorias = [objeto.catobjart for objeto in objetos if hasattr(
            objeto, 'data')]
        categorias = list(set(categorias))
        categorias.sort()

        listagem = []

        for ano in anos:
            for mes in meses:
                for tipo in tipos:
                    for categoria in categorias:
                        quantidade = len([objeto for objeto in objetos if hasattr(
                            objeto, 'data') and objeto.data.month == mes and objeto.data.year == ano and objeto.tipoobjart == tipo and objeto.catobjart == categoria])

                        custo = sum([objeto.custo for objeto in objetos if hasattr(
                            objeto, 'data') and objeto.data.month == mes and objeto.data.year == ano and objeto.tipoobjart == tipo and objeto.catobjart == categoria])

                        data = f"{ano}-{format_month(mes)}-01"

                        listagem.append({
                            'ano': ano,
                            'mes': mes,
                            'data': data,
                            'tipo': tipo,
                            'categoria': categoria,
                            'quantidade': quantidade,
                            'custo': custo
                        })

        listagem.append({
            'ano': 'TODOS',
            'mes': 'TODOS',
            'data': 'TODOS',
            'tipo': 'TODOS',
            'categoria': 'TODOS',
            'quantidade': len([objeto for objeto in objetos if hasattr(
                objeto, 'data')]),
            'custo': sum([objeto.custo for objeto in objetos if hasattr(
                objeto, 'data')])
        })

        return Response(listagem)