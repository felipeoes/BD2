// Requisito dados da API

export const botoes = {
    1:{
        label:'Funcionalidades',
        opcoes:['TODOS','Objetos Comprados', 'Coleções', 'Objetos Emprestados']
    },
    2:{
        label:'Tipo',
        opcoes:['TODOS','Tipo 1','Tipo 2','Tipo 3']
    },
    3:{
        label:'Classe',
        opcoes:['TODOS','Classe 1','Classe 2','Classe 3']
    },
    // 4:{
    //     label:'Mês',
    //     opcoes:['TODOS',1,2,3,4,5,6,7]
    //     // opcoes:['TODOS','Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho']
    // },
    4:{
        label:'Ano',
        opcoes:['TODOS',2020,2021,2022]
    },
    5:{
        label:'Coleção',
        opcoes:['TODOS','Coleção 1','Coleção 2','Coleção 3']
    },
};

export const botoesInput = {
    1:{
        label:'Tabelas',
        tabelas:[
            {'artista':[
                {'nome':'string'},
                {'descrartista':'string'},
                {'datamorte':'date'},
                {'estiloprincipal':'string'},
                {'periodoart':'date'},
                {'paisdeorigem':'string'}
            ]},
            {'coleca':[
                {'nomecol':'string'},
                {'desccol':'string'},
                {'endereco':'string'},
                {'telefone':'string'},
                {'pessoacontato':'string'},
                {'tipocol':'string'},
            ]},
            {'emprestados':[
                {'numobj4':'string'},
                {'datadevolucao':'string'},
                {'dataemprestimo':'string'},
                {'nomecolpert':'string'},
            ]},
            {'esculturas':[
                {'numobj2':'string'},
                {'material':'string'},
                {'altura':'string'},
                {'peso':'string'},
            ]},
            {'exposicoes':[
                {'nomeexp':'string'},
                {'datainicio':'string'},
                {'datafinal':'string'},
            ]},
            {'expostoem':[
                {'numobj6':'string'},
                {'nomeexpo':'string'},
            ]},
            {'objetos_arte':[
                {'numid':'string'},
                {'titulo':'string'},
                {'descricao':'string'},
                {'anocriacao':'string'},
                {'periodoobj':'string'},
                {'paiscultura':'string'},
                {'estilo':'string'},
                {'tipoobjart':'string'},
                {'catobjart':'string'},
                {'nomeart':'string'},
                {'custo':'string'},
            ]},
            {'outros':[
                {'numobj3':'string'},
                {'tipo':'string'},
            ]},
            {'permanentes':[
                {'numobj5':'string'},
                {'dataaquisicao':'string'},
                {'emexposicao':'string'},
            ]},
            {'pinturas':[
                {'numobj1':'string'},
                {'tipotinta':'string'},
                {'suporte':'string'},
            ]}]
    },
};



const funcionalidadesLista = ['Objetos Comprados', 'Coleções', 'Objetos Emprestados'];
const tiposLista = ['Tipo 1','Tipo 2','Tipo 3'];
const coletacaoLista = ['Coleção 1','Coleção 2','Coleção 3'];
const classeLista = ['Classe 1','Classe 2','Classe 3'];

const dataLinearChart = [];
for (let fId = 0; fId < funcionalidadesLista.length; fId++){
    for (let tId = 0; tId < tiposLista.length; tId++){
        for (let cId = 0; cId < coletacaoLista.length; cId++){
            for (let classId = 0; classId < classeLista.length; classId++){
                for (let ano = 2020; ano < 2023; ano++){
                    for (let mes = 1; mes <= 12; mes++) {
                        dataLinearChart.push(
                            {
                                Funcionalidades: funcionalidadesLista[fId],
                                Tipo: tiposLista[tId],
                                Coleção:coletacaoLista[cId],
                                Classe: classeLista[classId],
                                Ano:ano,
                                Mes:mes,
                                Data:ano+'-'+((''+mes).length == 1 ? '0'+mes : mes)+'-01',
                                Valor:Math.random()*100,
                                Quantidade:Math.random()*10,
                            }
                        )
                    }
                }
            }
        }
    }
}

const dataBarChart1 = [];
for (let fId = 0; fId < funcionalidadesLista.length; fId++){
    for (let tId = 0; tId < tiposLista.length; tId++){
        for (let cId = 0; cId < coletacaoLista.length; cId++){
            for (let classId = 0; classId < classeLista.length; classId++){
                for (let ano = 2020; ano < 2023; ano++){
                    dataBarChart1.push(
                        {
                            Funcionalidades: funcionalidadesLista[fId],
                            Tipo: tiposLista[tId],
                            Coleção:coletacaoLista[cId],
                            Classe: classeLista[classId],
                            Ano:ano,
                            Quantidade:Math.random()*100,
                            Valor:Math.random()*100*12
                        }
                    )
                }
            }
        }
    }
}

const dataPieChart = {};
for (let cId = 0; cId < coletacaoLista.length; cId++) {
    dataPieChart[coletacaoLista[cId]] = Math.random()*100
};

const dataTreeMap = [
    {name:'Origin',parent:'',value:''},
    {name:'Colecao 1',parent:'Origin',value:12},
    {name:'Colecao 2',parent:'Origin',value:23},
    {name:'Colecao 3',parent:'Origin',value:11},
    {name:'Colecao 4',parent:'Origin',value:40},
    {name:'Colecao 5',parent:'Origin',value:30},
    {name:'Colecao 6',parent:'Origin',value:25}
]


export default {dataLinearChart, dataBarChart1,dataPieChart,dataTreeMap};