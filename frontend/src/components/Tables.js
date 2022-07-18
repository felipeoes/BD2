'use strict'
import React, {useEffect, useState} from "react";

export const Tables = function (props){
    let cabecalho, qtd_colunas, valoresTabela;
    let linhaHTML = [];
    let keyContinua = 0;
    // console.log(props);
    try {
        cabecalho = Object.keys(props.dadosConsultaEscolhida[0]).map((x)=><div key={x} className={'tablePage__cabecalho'}>{x}</div>);
        qtd_colunas = Object.keys(props.dadosConsultaEscolhida[0]).length;

        valoresTabela = props.dadosConsultaEscolhida.map((linha)=>{

            Object.values(linha).reduce((linhaTabela,valorTabela)=>{
                linhaHTML.push(<div key={++keyContinua} className={'tablePage__valores'}>{valorTabela}</div>)
            },'')
        });
    } catch (error) {
        
    }

    return (
        <div>
            
            <div style={{display:'grid', gridTemplateColumns: `repeat(${qtd_colunas},1fr)`}}>
                {cabecalho}
                {linhaHTML}
            </div>
        </div>
    );
}