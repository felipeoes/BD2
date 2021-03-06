# Generated by Django 3.2.9 on 2022-07-07 04:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artista',
            fields=[
                ('nome', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('descrartista', models.CharField(blank=True, max_length=100, null=True)),
                ('datamorte', models.DateField(blank=True, null=True)),
                ('estiloprincipal', models.CharField(blank=True, max_length=50, null=True)),
                ('periodoart', models.CharField(blank=True, max_length=50, null=True)),
                ('paisdeorigem', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'artista',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Colecao',
            fields=[
                ('nomecol', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('desccol', models.CharField(blank=True, max_length=50, null=True)),
                ('endereco', models.CharField(blank=True, max_length=50, null=True)),
                ('telefone', models.CharField(blank=True, max_length=50, null=True)),
                ('pessoacontato', models.CharField(blank=True, max_length=50, null=True)),
                ('tipocol', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'colecao',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Exposicoes',
            fields=[
                ('nomeexp', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('datainicio', models.DateField(blank=True, null=True)),
                ('datafinal', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'exposicoes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ObjetosArte',
            fields=[
                ('numid', models.IntegerField(primary_key=True, serialize=False)),
                ('titulo', models.CharField(blank=True, max_length=50, null=True)),
                ('descricao', models.CharField(blank=True, max_length=50, null=True)),
                ('anocriacao', models.IntegerField(blank=True, null=True)),
                ('periodoobj', models.CharField(blank=True, max_length=50, null=True)),
                ('paiscultura', models.CharField(blank=True, max_length=50, null=True)),
                ('estilo', models.CharField(blank=True, max_length=50, null=True)),
                ('tipoobjart', models.CharField(blank=True, max_length=50, null=True)),
                ('catobjart', models.CharField(blank=True, max_length=50, null=True)),
                ('custo', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'objetos_arte',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Emprestados',
            fields=[
                ('numobj4', models.OneToOneField(db_column='numobj4', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='museu.objetosarte')),
                ('datadevolucao', models.DateField(blank=True, null=True)),
                ('dataemprestimo', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'emprestados',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Esculturas',
            fields=[
                ('numobj2', models.OneToOneField(db_column='numobj2', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='museu.objetosarte')),
                ('material', models.CharField(blank=True, max_length=50, null=True)),
                ('altura', models.FloatField(blank=True, null=True)),
                ('peso', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'esculturas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Expostoem',
            fields=[
                ('numobj6', models.OneToOneField(db_column='numobj6', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='museu.objetosarte')),
            ],
            options={
                'db_table': 'expostoem',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Outros',
            fields=[
                ('numobj3', models.OneToOneField(db_column='numobj3', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='museu.objetosarte')),
                ('tipo', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'outros',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Permanentes',
            fields=[
                ('numobj5', models.OneToOneField(db_column='numobj5', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='museu.objetosarte')),
                ('dataaquisicao', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'permanentes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Pinturas',
            fields=[
                ('numobj1', models.OneToOneField(db_column='numobj1', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='museu.objetosarte')),
                ('tipotinta', models.CharField(blank=True, max_length=50, null=True)),
                ('suporte', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'pinturas',
                'managed': False,
            },
        ),
    ]
