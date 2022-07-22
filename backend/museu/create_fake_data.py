import random
from .models import *

import datetime
# Cria os dados fictícios para todos os modelos do banco de dados

periodos = ['Renascimento', 'Barroco', 'Romantico',
            'Contemporaneo', 'Neoclassico', 'Moderno', 'Arte do Brasil']
paises_10 = ['Brasil', 'Argentina', 'Chile', 'Uruguai', 'Paraguai',
             'Bolívia', 'Colômbia', 'Peru', 'Venezuela', 'Bolívia']
estilos = ['Moderno', 'Contemporâneo', 'Neoclássico',
           'Barroco', 'Romântico', 'Renascimento', 'Arte do Brasil']
tipos_obj = ['Emprestado', 'Permanente']
categorias = ['Pintura', 'Escultura', 'Outros']
anos = ['2019', '2020', '2021', '2022']
exposto_em = [None, *Exposicoes.objects.all()]


def create_fake_data():
    # Cria os artistas fictícios
    # for i in range(1, 10):
    #     # recupera os atributos do artista
    #     Artista.objects.create(
    #         nome=f"Artista {i}",
    #         descrartista=f"Descrição do artista {i}",
    #         datamorte=f"{i}/{i}/{i}",
    #         estiloprincipal=f"Estilo principal {i}",
    #         periodoart=f"Período artístico {i}",
    #         paisdeorigem=f"País de origem {i}"
    #     )

    # # Cria as coleções fictícias
    # for i in range(1, 10):
    #     Colecao.objects.create(
    #         nome=f"Coleção {i}",
    #         descricao=f"Descrição da coleção {i}",
    #         imagem=f"https://picsum.photos/200/300?image={i}"
    #     )

    # Cria os objetos de arte fictícios
    for i in range(1000, 2000):
        tipo_obj = random.choice(tipos_obj)

        # Tenta criar
        try:
            obj_art = ObjetosArte.objects.create(
                numid=i,
                titulo=f"Título {i}",
                descricao=f"Descrição {i}",
                anocriacao=f"20{i}",
                periodoobj=random.choice(periodos),
                paiscultura=random.choice(paises_10),
                estilo=random.choice(estilos),
                tipoobjart=tipo_obj,
                catobjart=random.choice(categorias),
                nomeart=random.choice(Artista.objects.all()),
                custo=random.random() * 100,
            )
        except:
            obj_art = ObjetosArte.objects.get(numid=i)

        if tipo_obj == 'Permanente':
            # Gera um mês aleatório para a data de aquisição de acordo com o ano
            ano = random.choice(anos)
            mes = random.randint(1, 12)
            dia = 1
            # recupera os atributos do objeto permanente
            exposicao = random.choice(exposto_em)

            try:
                objeto = Permanentes.objects.create(numobj5=obj_art,
                                                    dataaquisicao=datetime.date(
                                                        int(ano), mes, dia),
                                                    emexposicao=exposicao)
            except:
                objeto = Permanentes.objects.get(numobj5=obj_art)

            # Cria o objeto exposto em
            if exposicao:
                try:
                    Expostoem.objects.create(numobj6=objeto,
                                             exposicao=exposicao)
                except:
                    pass

        elif tipo_obj == 'Emprestado':
            #  Gera as datas de devolução e emprestimo aleatórias, sendo que a data de devolução não pode ser anterior a data de emprestimo
            data_emprestimo = datetime.date(
                random.randint(2019, 2022), random.randint(1, 12), 1)
            data_devolucao = datetime.date(random.randint(
                2019, 2022), random.randint(1, 12), 1)
            while data_devolucao < data_emprestimo:
                data_devolucao = datetime.date(random.randint(
                    2019, 2022), random.randint(1, 12), 1)

            # recupera os atributos do objeto emprestado
            objeto = Emprestados.objects.create(numobj4=obj_art, datadevolucao=data_devolucao,
                                                dataemprestimo=data_emprestimo,
                                                nomecolpert=random.choice(Colecao.objects.all()))


if (__name__ == 'main'):
    create_fake_data()
