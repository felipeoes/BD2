from .models import *

# Cria os dados fictícios para todos os modelos do banco de dados


def create_fake_data():
    # Cria os artistas fictícios
    for i in range(1, 10):
        # recupera os atributos do artista
        Artista.objects.create(
            nome=f"Artista {i}",
            descrartista=f"Descrição do artista {i}",
            data_nascimento=f"{i}/{i}/{i}",
            datamorte=f"{i}/{i}/{i}",
            estiloprincipal=f"Estilo principal {i}",
            periodoart=f"Período artístico {i}",
            paisdeorigem=f"País de origem {i}"
        )

    # Cria as coleções fictícias
    for i in range(1, 10):
        Colecao.objects.create(
            nome=f"Coleção {i}",
            descricao=f"Descrição da coleção {i}",
            imagem=f"https://picsum.photos/200/300?image={i}"
        )

    # Cria os objetos de arte fictícios
    for i in range(1, 10):
        ObjetosArte.objects.create(
            nome=f"Objeto de arte {i}",
            descricao=f"Descrição do objeto de arte {i}",
            imagem=f"https://picsum.photos/200/300?image={i}"
        )

    # Cria os permanentes fictícios
    for i in range(1, 10):
        Permanentes.objects.create(
            nome=f"Permanente {i}",
            descricao=f"Descrição do permanente {i}",
            imagem=f"https://picsum.photos/200/300?image={i}"
        )

    # Cria as pinturas fictícias
    for i in range(1, 10):
        Pinturas.objects.create(
            nome=f"Pintura {i}",
            descricao=f"Descrição da pintura {i}",
            imagem=f"https://picsum.photos/200/300?image={i}"
        )

    # Cria as esculturas fictícias
