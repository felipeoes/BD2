// Requisito dados da API
import { ImportDataPython } from "./ImportDataPython";
import axios from 'axios';
import 'regenerator-runtime/runtime';


// const endPoint = 'http://127.0.0.1:8000/esquemas/?format=api';
const endPointEsquema = 'http://127.0.0.1:8000/esquemas/?format=json';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
let botoesInputAPI = {
    1:{
        label:'Tabelas'
    }
};
axios(endPointEsquema).then((response)=>{
    botoesInputAPI[1]['tabelas'] = response.data;
});



// const botoesInput = {
//     1:{
//         label:'Tabelas',
//         tabelas:{
//             'artista':[
//                 {'nome':'text'},
//                 {'descrartista':'text'},
//                 {'datamorte':'date'},
//                 {'estiloprincipal':'text'},
//                 {'periodoart':'date'},
//                 {'paisdeorigem':'text'}
//             ],
//             'colecao':[
//                 {'nomecol':'text'},
//                 {'desccol':'text'},
//                 {'endereco':'text'},
//                 {'telefone':'text'},
//                 {'pessoacontato':'text'},
//                 {'tipocol':'text'},
//             ],
//             'emprestados':[
//                 {'numobj4':'text'},
//                 {'datadevolucao':'date'},
//                 {'dataemprestimo':'date'},
//                 {'nomecolpert':'text'},
//             ],
//             'esculturas':[
//                 {'numobj2':'text'},
//                 {'material':'text'},
//                 {'altura':'text'},
//                 {'peso':'text'},
//             ],
//             'exposicoes':[
//                 {'nomeexp':'text'},
//                 {'datainicio':'date'},
//                 {'datafinal':'date'},
//             ],
//             'expostoem':[
//                 {'numobj6':'text'},
//                 {'nomeexpo':'text'},
//             ],
//             'objetos_arte':[
//                 {'numid':'text'},
//                 {'titulo':'text'},
//                 {'descricao':'text'},
//                 {'anocriacao':'number'},
//                 {'periodoobj':'text'},
//                 {'paiscultura':'text'},
//                 {'estilo':'text'},
//                 {'tipoobjart':'text'},
//                 {'catobjart':'text'},
//                 {'nomeart':'text'},
//                 {'custo':'text'},
//             ],
//             'outros':[
//                 {'numobj3':'text'},
//                 {'tipo':'text'},
//             ],
//             'permanentes':[
//                 {'numobj5':'text'},
//                 {'dataaquisicao':'date'},
//                 {'emexposicao':'text'},
//             ],
//             'pinturas':[
//                 {'numobj1':'text'},
//                 {'tipotinta':'text'},
//                 {'suporte':'text'},
//             ]
//         }
//     },
// };


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
    {name:'Origin1',parent:'',value:''},
    {name:'Colecao 1',parent:'Origin1',value:12},
    {name:'Colecao 2',parent:'Origin1',value:23},
    {name:'Colecao 3',parent:'Origin1',value:11},
    {name:'Origin2',parent:'Origin1',value:''},
    {name:'Colecao 4',parent:'Origin2',value:2},
    {name:'Colecao 5',parent:'Origin2',value:30},
    {name:'Colecao 6',parent:'Origin2',value:25}
]



// Importacao para pageTable
const endPointTableAll = {
    "artistas":"http://127.0.0.1:8000/artistas/?format=json",
    "colecoes":"http://127.0.0.1:8000/colecoes/?format=json",
    "emprestados":"http://127.0.0.1:8000/emprestados/?format=json",
    "esculturas":"http://127.0.0.1:8000/esculturas/?format=json",
    "exposicoes":"http://127.0.0.1:8000/exposicoes/?format=json",
    "expostoem":"http://127.0.0.1:8000/expostoem/?format=json",
    "objetosarte":"http://127.0.0.1:8000/objetosarte/?format=json",
    "outros":"http://127.0.0.1:8000/outros/?format=json",
    "permanentes":"http://127.0.0.1:8000/permanentes/?format=json",
    "pinturas":"http://127.0.0.1:8000/pinturas/?format=json",
    "listaobjetos-tipo":"http://127.0.0.1:8000/listaobjetos-tipo/?format=json",
    "listaobjetos-categoria":"http://127.0.0.1:8000/listaobjetos-categoria/?format=json",
    "objetos-custo-total-ano":"http://127.0.0.1:8000/objetos-custo-total-ano/?format=json",
    "objetos-custo-total-ano-tipo":"http://127.0.0.1:8000/objetos-custo-total-ano-tipo/?format=json",
    "objetos-custo-total-mes":"http://127.0.0.1:8000/objetos-custo-total-mes/?format=json",
    "objetos-custo-total-mes-tipo":"http://127.0.0.1:8000/objetos-custo-total-mes-tipo/?format=json",
    "objetos-quantidade-total-ano":"http://127.0.0.1:8000/objetos-quantidade-total-ano/?format=json",
    "objetos-quantidade-total-mes":"http://127.0.0.1:8000/objetos-quantidade-total-mes/?format=json",
    "esquemas":"http://127.0.0.1:8000/esquemas/?format=json",
    "opcoes-botoes":"http://127.0.0.1:8000/opcoes-botoes/?format=json",
    "agrupamentos":"http://127.0.0.1:8000/agrupamentos/?format=json"};


let consultasTableAPI = {};

export const importConsultaTable = function(){

    let fetchDataFromAPI = async (url) => {
        let response = await fetch(url);
        let result = await response.json();
        return result;
    };


    Object.keys(endPointTableAll).map((chave)=>{
        consultasTableAPI[chave]=fetchDataFromAPI(endPointTableAll[chave]);

    });    

    return consultasTableAPI;
}
//############################################################################################### 
//###############################################################################################

// Importacao para pageTable
const endPointGraphAll = {
    'agrupamentos':'http://127.0.0.1:8000/agrupamentos/?format=json',
    'botoes':'http://127.0.0.1:8000/opcoes-botoes/?format=json',
};
let consultasGraphAPI = {};

export const importConsultaGraph = function(){

    let fetchDataFromAPI = async (url) => {
        let response = await fetch(url);
        let result = await response.json();
        return result;
    };


    Object.keys(endPointGraphAll).map((chave)=>{
        consultasGraphAPI[chave]=fetchDataFromAPI(endPointGraphAll[chave]);
    });    

    return consultasGraphAPI;
}


export default {dataLinearChart, dataBarChart1,dataPieChart,dataTreeMap, botoesInputAPI, consultasTableAPI};