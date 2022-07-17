from django.db import models


class Artista(models.Model):
    nome = models.CharField(primary_key=True, max_length=50)
    descrartista = models.CharField(max_length=100, blank=True, null=True)
    datamorte = models.DateField(blank=True, null=True)
    estiloprincipal = models.CharField(max_length=50, blank=True, null=True)
    periodoart = models.CharField(max_length=50, blank=True, null=True)
    paisdeorigem = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'artista'


class Colecao(models.Model):
    nomecol = models.CharField(primary_key=True, max_length=50)
    desccol = models.CharField(max_length=50, blank=True, null=True)
    endereco = models.CharField(max_length=50, blank=True, null=True)
    telefone = models.CharField(max_length=50, blank=True, null=True)
    pessoacontato = models.CharField(max_length=50, blank=True, null=True)
    tipocol = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'colecao'


class Emprestados(models.Model):
    numobj4 = models.OneToOneField(
        'ObjetosArte', models.CASCADE, db_column='numobj4', primary_key=True)
    datadevolucao = models.DateField(blank=True, null=True)
    dataemprestimo = models.DateField(blank=True, null=True)
    nomecolpert = models.ForeignKey(
        Colecao, models.CASCADE, db_column='nomecolpert', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'emprestados'


class Esculturas(models.Model):
    numobj2 = models.OneToOneField(
        'ObjetosArte', models.CASCADE, db_column='numobj2', primary_key=True)
    material = models.CharField(max_length=50, blank=True, null=True)
    altura = models.FloatField(blank=True, null=True)
    peso = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'esculturas'


class Exposicoes(models.Model):
    nomeexp = models.CharField(primary_key=True, max_length=50)
    datainicio = models.DateField(blank=True, null=True)
    datafinal = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'exposicoes'


class Expostoem(models.Model):
    numobj6 = models.OneToOneField(
        'ObjetosArte', models.CASCADE, db_column='numobj6', primary_key=True)
    nomeexpo = models.ForeignKey(
        Exposicoes, models.CASCADE, db_column='nomeexpo')

    class Meta:
        managed = False
        db_table = 'expostoem'
        unique_together = (('numobj6', 'nomeexpo'),)


class ObjetosArte(models.Model):
    numid = models.IntegerField(primary_key=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    titulo = models.CharField(max_length=50, blank=True, null=True)
    descricao = models.CharField(max_length=50, blank=True, null=True)
    anocriacao = models.IntegerField(blank=True, null=True)
    periodoobj = models.CharField(max_length=50, blank=True, null=True)
    paiscultura = models.CharField(max_length=50, blank=True, null=True)
    estilo = models.CharField(max_length=50, blank=True, null=True)
    tipoobjart = models.CharField(max_length=50, blank=True, null=True)
    catobjart = models.CharField(max_length=50, blank=True, null=True)
    nomeart = models.ForeignKey(
        Artista, models.CASCADE, db_column='nomeart', blank=True, null=True)
    custo = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'objetos_arte'

class Outros(models.Model):
    numobj3 = models.OneToOneField(
        ObjetosArte, models.CASCADE, db_column='numobj3', primary_key=True)
    tipo = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'outros'


class Permanentes(models.Model):
    numobj5 = models.OneToOneField(
        ObjetosArte, models.CASCADE, db_column='numobj5', primary_key=True)
    dataaquisicao = models.DateField(blank=True, null=True)
    emexposicao = models.ForeignKey(
        Exposicoes, models.CASCADE, db_column='emexposicao', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'permanentes'


class Pinturas(models.Model):
    numobj1 = models.OneToOneField(
        ObjetosArte, models.CASCADE, db_column='numobj1', primary_key=True)
    tipotinta = models.CharField(max_length=50, blank=True, null=True)
    suporte = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pinturas'
