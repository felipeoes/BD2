import React, {useEffect, useState} from "react";
import { UseBarChart } from "../UseBarChart";
import { UseLineChart } from "../UseLineChart";
import { UsePieChart } from "../UsePieChart";
export const GraphPage = function (props){

    const geracao_opcoes = function(){
        let plot;
        
        plot = function(numero){
            // const nome = 'opcao_lista_'.concat(numero);
            return (
                <div key={numero} className="graph__menu__coluna ">
                    <label className="lista_label" htmlFor={"opcao_lista_" + numero}>Atributo {numero}</label>
                    <select name="opcao_lista" id="opcao_lista_">
                        <option value="Opcao1">Opcao1</option>
                        <option value="Opcao2">Opcao2</option>
                        <option value="Opcao3">Opcao3</option>
                        <option value="Opcao4">Opcao4</option>                        
                    </select>                    
                </div>
            );
        };

        const plot_fake = [];
        for (let i = 0; i < 10; i++){
            plot_fake.push(plot(i));
        }
        return plot_fake;
        
        
    }

    return (
        <div className="Content animacaoEntrada graphPage">
            <div className="graph__menu">
                <div className="graph__menu__coluna">
                    <label className="lista_label" htmlFor="exposicao_lista">Exposicao</label>
                    <select name="exposicao_lista" id="exposicao_lista">
                        <option value="Exposicao1">Exposicao1</option>
                        <option value="Exposicao2">Exposicao2</option>
                        <option value="Exposicao3">Exposicao3</option>
                        <option value="Exposicao4">Exposicao4</option>                        
                    </select>
                </div>
                <div className="graph__menu__coluna">
                    <label className="lista_label" htmlFor="opcao_lista">Outra opcao</label>
                    <select name="opcao_lista" id="opcao_lista">
                        <option value="Opcao1">Opcao1</option>
                        <option value="Opcao2">Opcao2</option>
                        <option value="Opcao3">Opcao3</option>
                        <option value="Opcao4">Opcao4</option>                        
                    </select>                    
                </div>
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
                    <UseBarChart/>
                    <UseLineChart/>
                    <UsePieChart/>
                </div>
                {/* <div className="row">
                    <div className="col-1-2">
                    </div>
                    <div className="col-1-2">
                    </div>
                </div> */}
            </div>

        </div>
    );
}