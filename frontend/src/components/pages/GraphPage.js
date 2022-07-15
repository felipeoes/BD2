'use strict'
import React, {useEffect, useState} from "react";
import { UseBarChart } from "../UseBarChart";
import { UseLineChart } from "../UseLineChart";
import { UsePieChart } from "../UsePieChart";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";

import { botoes } from "../services/api";
import dadosAPI from "../services/api";
import { filtros } from "../Filtros";
import { PieChart } from "../PieChart";
import { TreeMap } from "../TreeMap";


export const GraphPage = function (props){
    const dataBarChart = dadosAPI.dataBarChart;
    const dataLinearChart = dadosAPI.dataLinearChart;
    const dataPieChart = dadosAPI.dataPieChart;
    const dataTreeMap = dadosAPI.dataTreeMap;
    
                
    const [opcoesSelecionadas,setOpcoesSelecionadas] = useState();
    const [dataBarChartFiltered,setdataBarChartFiltered] = useState(dataBarChart);
    const [dataLinearChartFiltered,setdataLinearChartFiltered] = useState(dataLinearChart);
    const [datadataTreeMapFiltered,setdatadataTreeMapFiltered] = useState(dataTreeMap);
    let dadoFiltrado;

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
        
        // Filtrar dados para o grafico de barras

        // Atualizo o valor inicial dos dados de barra com base no dado consultado da API        
        dadoFiltrado = filtros(dataBarChart,opcoesSelecionadas_aux);        
        setdataBarChartFiltered(dadoFiltrado);
        
        // Filtrar dados para o grafico de pizza
        
        // Filtrar dados para o grafico de linha
        dadoFiltrado = filtros(dataLinearChart,opcoesSelecionadas_aux);        
        setdataLinearChartFiltered(dadoFiltrado);
        
        // Filtrar dados para o grafico de tree map

        // Filtrar valores unicos
    }

    // const dadoFiltrado = {...dataBarChart};
    
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
        dadoFiltrado = filtros(dataBarChart,valorInicial);
        setdataBarChartFiltered(dadoFiltrado);
        
        
        // Atualizo o valor inicial dos dados do grafico de linha com base no dado consultado da API        
        dadoFiltrado = filtros(dataLinearChart,valorInicial);
        setdataLinearChartFiltered(dadoFiltrado);


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
                    <BarChart data={[dataBarChartFiltered,'Ano','Quantidade']}  tituloGrafico = 'Custo Total de Objetos Comprados por Ano'/>
                    <LineChart data={[dataLinearChartFiltered,'Data','Valor']} tituloGrafico = 'Série Temporal do Custo Mensal de Objetos Comprados'/>
                    <PieChart data={[dataPieChart]} tituloGrafico = 'Qtd Colecao'/>
                    <TreeMap data={[dataTreeMap]} tituloGrafico = 'Árvore agrupada de ...'/>
                </div>

            </div>

        </div>
    );
}