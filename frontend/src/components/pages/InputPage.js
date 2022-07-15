import React, {useEffect, useState} from "react";
import { Formularios } from "../Formularios";
import { botoes,botoesInput } from "../services/api";

export const InputPage = function (props){
    const [opcoesSelecionadas,setOpcoesSelecionadas] = useState();

    const geracao_opcoes = function(){
        const mudarOpcoes = function(e){
            console.log(e.target.value);
            setOpcoesSelecionadas(e.target.value);
        }
        const plot = function(botao){
            // const nome = 'opcao_lista_'.concat(numero);
            return (
                <div key={botao.label} className="input__menu__coluna ">
                    <label className="lista_label" htmlFor={botao.label}>{botao.label}</label>
                    <select className = "opcao_lista" name="opcao_lista" id={botao.label} onChange={mudarOpcoes}>                        
                        {botao.tabelas.map((opcao,_id)=><option key={_id}>{Object.keys(opcao)[0]}</option>)}
                    </select>                    
                </div>
            );
        };

        // Renderizo as opcoes vinda pelo JSON da API
        return Object.values(botoesInput).map(plot);
    }    
    return (
        <div className="Content animacaoEntrada inputPage">
            <div className="input__menu">
                {geracao_opcoes()}
            </div>
            <div className="input__content">
                <Formularios botoes={botoesInput}/>
            </div>
        </div>
    );
}