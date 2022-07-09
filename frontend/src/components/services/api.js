// Requisito dados da API

export const botoes = {
    1:{
        label:'Funcionalidades',
        opcoes: ['Objetos Comprados', 'Coleções', 'Objetos Emprestados']
    },
    2:{
        label:'Tipo',
        opcoes:['Tipo 1','Tipo 2','Tipo 3']
    },
    3:{
        label:'Classe',
        opcoes:['Classe 1','Classe 2','Classe 3']
    },
    // 4:{
    //     label:'Mês',
    //     opcoes:['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho']
    // },
    // 5:{
    //     label:'Ano',
    //     opcoes:[2020,2021,2022]
    // },
    4:{
        label:'Coleção',
        opcoes:['Coleção 1','Coleção 2','Coleção 3']
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
                            }
                        )
                    }
                }
            }
        }
    }
}

const dataBarChart = [];
for (let fId = 0; fId < funcionalidadesLista.length; fId++){
    for (let tId = 0; tId < tiposLista.length; tId++){
        for (let cId = 0; cId < coletacaoLista.length; cId++){
            for (let classId = 0; classId < classeLista.length; classId++){
                for (let ano = 2020; ano < 2023; ano++){
                    dataBarChart.push(
                        {
                            Funcionalidades: funcionalidadesLista[fId],
                            Tipo: tiposLista[tId],
                            Coleção:coletacaoLista[cId],
                            Classe: classeLista[classId],
                            Ano:ano,
                            Quantidade:Math.random()*100,
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
    // {
    //   artista_1: 9,
    //   artista_2 :20,
    //   artista_3 :30,
    //   artista_4 :8,
    //   artista_5 :12,
    //   artista_6 :100,
    //   artista_7 :100,
    //   artista_8 :30,
    //   artista_9 :100
    // }


export default {dataLinearChart, dataBarChart,dataPieChart};