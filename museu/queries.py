from django.db import connection
import json

def cursor_to_dict(cursor):
    """ Converte um cursor em um dicionário """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_all_artists():
    """ Recupera todos os artistas"""
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM artista")

        # Converte os dados para JSON
        return cursor_to_dict(cursor)


def get_all_art_objects():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM objetos_arte")

        return cursor_to_dict(cursor)

# Liste os objetos de arte comprados por tipo e por classe (emprestado ou próprio)
def get_art_objects_by_type(type: str):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM objetos_arte WHERE tipoobjart = %s", [type])

        return cursor_to_dict(cursor)