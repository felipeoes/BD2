import React, {useEffect, useState} from "react";
import { Formularios } from "../Formularios";
import { botoes,botoesInput } from "../services/api";

export const InputPage = function (props){
    const [opcoesSelecionadas,setOpcoesSelecionadas] = useState(['artista']);
    
    useEffect(()=>{
        const valorInicial = document.querySelector('.opcao_lista--inputPage').value;        
        // console.log(valorInicial);
        // const valorArmazenado = {'valor':[botoesInput[1].tabelas[valorInicial]]};
        // console.log(botoesInput[1].tabelas[valorInicial][1]);
        setOpcoesSelecionadas(valorInicial);
        
    },[]);

    const geracao_opcoes = function(){
        
        
        const mudarOpcoes = function(e){
            setOpcoesSelecionadas(e.target.value);
        }
        const plot = function(botao){

            return (
                <div key={botao.label} className="input__menu__coluna ">
                    <label className="lista_label" htmlFor={botao.label}>{botao.label}</label>
                    <select className = "opcao_lista opcao_lista--inputPage" name="opcao_lista" id={botao.label} onChange={mudarOpcoes}>                        
                        {Object.keys(botao.tabelas).map((opcao,_id)=><option key={_id}>{opcao}</option>)}
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
                <Formularios tabelaEscolhida={opcoesSelecionadas} camposFormulario={botoesInput[1].tabelas[opcoesSelecionadas]}/>
            </div>
        </div>
    );
}