'use strict'
import React, {useEffect, useState} from "react";
import { UseBarChart } from "../UseBarChart";
import { UseLineChart } from "../UseLineChart";
import { UsePieChart } from "../UsePieChart";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";

// import { botoes } from "../services/api";
import dadosAPI from "../services/api";
import { filtros, groupBySum } from "../services/utils";
import { PieChart } from "../PieChart";
import { TreeMap } from "../TreeMap";
import { importConsultaGraph } from "../services/api";

export const GraphPage = function (props){

    // const dataBarChart1 = dadosAPI.dataBarChart1;    
    // const dataLinearChart = dadosAPI.dataLinearChart;    
    const dataPieChart = dadosAPI.dataPieChart;
    const dataTreeMap = dadosAPI.dataTreeMap;

    
    const [dataLinearChart,setDataLinearChart] = useState();
    const [dataBarChart1,setDataBarChart1] = useState();

    const botoesInicial = {
        1:{
            label:'X',
            opcoes:['TODOS']
        },        
        2:{
            label:'ano',
            opcoes:['TODOS']
        },
    };

    const [botoes,setBotoes] = useState(botoesInicial);


    const [opcoesSelecionadas,setOpcoesSelecionadas] = useState();
    const [dataBarChartFiltered,setdataBarChartFiltered] = useState(dataLinearChart);
    const [dataBarChartFilteredQuantidade,setdataBarChartFilteredQuantidade] = useState(dataLinearChart);
    const [dataLinearChartFiltered,setdataLinearChartFiltered] = useState(dataLinearChart);
    const [dataLinearChartFilteredQuantidade,setdataLinearChartFilteredQuantidade] = useState(dataLinearChart);
    const [datadataTreeMapFiltered,setdatadataTreeMapFiltered] = useState(dataTreeMap);

    const [dadosConsulta,setDadosConsulta] = useState('');

    let dadoFiltrado, dadoFiltrado2;

    // const dadoFiltrado = {...dataLinearChart};
    
    useEffect(()=>{

        const resultadoPromise = importConsultaGraph();
        const camposFiltro = Object.keys(resultadoPromise);
        
        resultadoPromise[camposFiltro[1]].then((listaBotoes)=>{
            setBotoes(listaBotoes);
        });

        resultadoPromise[camposFiltro[0]].then((dataLineChartPromise)=>{            
            setDataLinearChart(dataLineChartPromise);

            

            const selecionadoresOpcao = document.querySelectorAll('.opcao_lista');
            const selecionadoresLabel = document.querySelectorAll('.lista_label');
            
            const valorInicial = {};

            resultadoPromise[camposFiltro[1]].then((listaBotoes)=>{
                Object.values(listaBotoes).forEach((linha)=>{
                    valorInicial[linha.label]=linha.opcoes[0];
                });
                
                setOpcoesSelecionadas(valorInicial);
                
                
                // Atualizo o valor inicial dos dados de barra com base no dado consultado da API        
                dadoFiltrado = filtros(dataLineChartPromise,valorInicial);                
                dadoFiltrado2 = groupBySum(dadoFiltrado,'ano','custo');                    
                setdataBarChartFiltered(dadoFiltrado2);
                
                dadoFiltrado2 = groupBySum(dadoFiltrado,'ano','quantidade');
                setdataBarChartFilteredQuantidade(dadoFiltrado2);
                
                
                // Atualizo o valor inicial dos dados do grafico de linha com base no dado consultado da API        
                dadoFiltrado = filtros(dataLineChartPromise,valorInicial);    
                dadoFiltrado2 = groupBySum(dadoFiltrado,'data','custo');
                
                setdataLinearChartFiltered(dadoFiltrado2);
                
                dadoFiltrado2 = groupBySum(dadoFiltrado,'data','quantidade');
                setdataLinearChartFilteredQuantidade(dadoFiltrado2);
            });            


        });
        



    },[]);



    const mudarOpcoes = function(e){
        let novo_valor;
        if (isNaN(parseInt(e.target.value))){
            novo_valor = {
                [e.target.id]:e.target.value
            }
        }
        else{
            novo_valor = {
                [e.target.id]:parseInt(e.target.value)
            }
        }
        const opcoesSelecionadas_aux = {...opcoesSelecionadas}
        
        opcoesSelecionadas_aux[e.target.id]=e.target.value;

        setOpcoesSelecionadas(opcoesSelecionadas_aux);
        
        
        // Atualizo o valor inicial dos dados de barra com base no dado consultado da API        
        // Filtrar dados para o grafico de barras
        dadoFiltrado = filtros(dataLinearChart,opcoesSelecionadas_aux);      
        dadoFiltrado2 = groupBySum(dadoFiltrado,'ano','custo');  
        setdataBarChartFiltered(dadoFiltrado2);

        dadoFiltrado2 = groupBySum(dadoFiltrado,'ano','quantidade');  
        setdataBarChartFilteredQuantidade(dadoFiltrado2);
        
        // Filtrar dados para o grafico de pizza
        
        // Filtrar dados para o grafico de linha
        dadoFiltrado = filtros(dataLinearChart,opcoesSelecionadas_aux);     
        dadoFiltrado2 = groupBySum(dadoFiltrado,'data','custo');        

        setdataLinearChartFiltered(dadoFiltrado2);
        
        dadoFiltrado2 = groupBySum(dadoFiltrado,'data','quantidade');
        setdataLinearChartFilteredQuantidade(dadoFiltrado2);
        

    }




    const atualizarConsultas = function(){
        const resultado = importConsultaGraph();
        setDadosConsulta(resultado);        
    };
            

    
    const geracao_opcoes = function(){
        
        const plot = function(botao){
            // const nome = 'opcao_lista_'.concat(numero);
            return (
                <div key={botao.label} className="graph__menu__coluna ">
                    <label className="lista_label" htmlFor={botao.label}>{botao.label}</label>
                    <select className = "opcao_lista" name="opcao_lista" id={botao.label} onChange={mudarOpcoes}>
                        {botao.opcoes.map((opcao,_id)=><option key={_id}>{opcao}</option>)}
                    </select>                    
                </div>
            );
        };

        // Renderizo as opcoes vinda pelo JSON da API
        return Object.values(botoes).map(plot);
    }

    return (
        <div className="Content animacaoEntrada graphPage">
            <div className="graph__menu">
                {geracao_opcoes()}
            </div>
            <div className="graph__content">
                <div className="graph__header">
                    <div className="graph__header__number graph__header__number--artist">
                        150
                    </div>
                    <div className="graph__header__number">
                        2
                    </div>
                    <div className="graph__header__number">
                        3
                    </div>
                    <div className="graph__header__number">
                        4
                    </div>
                </div>
                <div className="graph__plot">           
                    <BarChart data={[dataBarChartFiltered,'ano','custo']}  tituloGrafico = 'Custo Total de Objetos Comprados por Ano' tituloEixoY = 'Custo ($)'/>
                    <LineChart data={[dataLinearChartFiltered,'data','custo']} tituloGrafico = 'Série Temporal do Custo Mensal de Objetos Comprados' tituloEixoY = 'Custo ($)'/>
                    <BarChart data={[dataBarChartFilteredQuantidade,'ano','quantidade']}  tituloGrafico = 'Quantidade de Objetos Comprados por Ano' tituloEixoY = 'Quantidade'/>
                    <LineChart data={[dataLinearChartFilteredQuantidade,'Data','quantidade']} tituloGrafico = 'Série Temporal da Quantidade Mensal de Objetos Comprados' tituloEixoY = 'Quantidade'/>
                    <PieChart data={[dataPieChart]} tituloGrafico = 'Quantidade de Colecao'/>
                    <TreeMap data={[dataTreeMap]} tituloGrafico = 'Árvore agrupada de ...'/>
                </div>

            </div>

        </div>
    );
}