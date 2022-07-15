'use strict'
import React, {useEffect, useState} from "react";
import { UseBarChart } from "../UseBarChart";
import { UseLineChart } from "../UseLineChart";
import { UsePieChart } from "../UsePieChart";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";

import { botoes } from "../services/api";
import dadosAPI from "../services/api";
import { filtros, groupBySum } from "../services/utils";
import { PieChart } from "../PieChart";
import { TreeMap } from "../TreeMap";


export const GraphPage = function (props){
    const dataBarChart1 = dadosAPI.dataBarChart1;
    const dataLinearChart = dadosAPI.dataLinearChart;    
    const dataPieChart = dadosAPI.dataPieChart;
    const dataTreeMap = dadosAPI.dataTreeMap;
                    
    const [opcoesSelecionadas,setOpcoesSelecionadas] = useState();
    const [dataBarChartFiltered,setdataBarChartFiltered] = useState(dataBarChart1);
    const [dataBarChartFilteredQuantidade,setdataBarChartFilteredQuantidade] = useState(dataBarChart1);
    const [dataLinearChartFiltered,setdataLinearChartFiltered] = useState(dataLinearChart);
    const [dataLinearChartFilteredQuantidade,setdataLinearChartFilteredQuantidade] = useState(dataLinearChart);
    const [datadataTreeMapFiltered,setdatadataTreeMapFiltered] = useState(dataTreeMap);
    let dadoFiltrado, dadoFiltrado2;

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
        dadoFiltrado = filtros(dataBarChart1,opcoesSelecionadas_aux);      
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Ano','Valor');  
        setdataBarChartFiltered(dadoFiltrado2);

        dadoFiltrado2 = groupBySum(dadoFiltrado,'Ano','Quantidade');  
        setdataBarChartFilteredQuantidade(dadoFiltrado2);
        
        // Filtrar dados para o grafico de pizza
        
        // Filtrar dados para o grafico de linha
        dadoFiltrado = filtros(dataLinearChart,opcoesSelecionadas_aux);     
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Data','Valor');
        setdataLinearChartFiltered(dadoFiltrado2);
        
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Data','Quantidade');
        setdataLinearChartFilteredQuantidade(dadoFiltrado2);
        
        // Filtrar dados para o grafico de tree map

        // Filtrar valores unicos

        // console.log(dataLinearChartFiltered);

    }

    // const dadoFiltrado = {...dataBarChart1};
    
    useEffect(()=>{
        const selecionadoresOpcao = document.querySelectorAll('.opcao_lista');
        const selecionadoresLabel = document.querySelectorAll('.lista_label');
        
        const valorInicial = {};
        [...selecionadoresLabel].forEach(
            (e,_id)=>{
                if (isNaN(parseInt([...selecionadoresOpcao][_id].value))){                
                    valorInicial[e.textContent]=[...selecionadoresOpcao][_id].value;
                }
                else{
                    valorInicial[e.textContent]=parseInt([...selecionadoresOpcao][_id].value);
                }
            }
        );

        setOpcoesSelecionadas(valorInicial);
        
        // Atualizo o valor inicial dos dados de barra com base no dado consultado da API        
        dadoFiltrado = filtros(dataBarChart1,valorInicial);
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Ano','Valor');
        setdataBarChartFiltered(dadoFiltrado2);
        
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Ano','Quantidade');
        setdataBarChartFilteredQuantidade(dadoFiltrado2);
        
        
        // Atualizo o valor inicial dos dados do grafico de linha com base no dado consultado da API        
        dadoFiltrado = filtros(dataLinearChart,valorInicial);
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Data','Valor');
        setdataLinearChartFiltered(dadoFiltrado2);
        
        dadoFiltrado2 = groupBySum(dadoFiltrado,'Data','Quantidade');
        setdataLinearChartFilteredQuantidade(dadoFiltrado2);

    },[]);
            

    
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
                    <BarChart data={[dataBarChartFiltered,'Ano','Valor']}  tituloGrafico = 'Custo Total de Objetos Comprados por Ano' tituloEixoY = 'Custo ($)'/>
                    <LineChart data={[dataLinearChartFiltered,'Data','Valor']} tituloGrafico = 'Série Temporal do Custo Mensal de Objetos Comprados' tituloEixoY = 'Custo ($)'/>
                    <BarChart data={[dataBarChartFilteredQuantidade,'Ano','Quantidade']}  tituloGrafico = 'Quantidade de Objetos Comprados por Ano' tituloEixoY = 'Quantidade'/>
                    <LineChart data={[dataLinearChartFilteredQuantidade,'Data','Quantidade']} tituloGrafico = 'Série Temporal da Quantidade Mensal de Objetos Comprados' tituloEixoY = 'Quantidade'/>
                    <PieChart data={[dataPieChart]} tituloGrafico = 'Quantidade de Colecao'/>
                    <TreeMap data={[dataTreeMap]} tituloGrafico = 'Árvore agrupada de ...'/>
                </div>

            </div>

        </div>
    );
}