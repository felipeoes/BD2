'use strict'
import React, {useEffect, useState} from "react";
import { ExportDataPython } from "./services/ExportDataPython";
import axios from 'axios';

export const Formularios = function (props){
    
    const gerarFields = function(){
        let labelField = []
        try {
            props.camposFormulario.forEach(element => {
                let fieldName = Object.keys(element)[0];
                let fieldTipo = Object.values(element)[0];
                labelField.push(
                    <div key={fieldName} className="input__content--linha">
                        <div className="input__content--label">{fieldName}</div>
                        <input className={`input__content--field ${fieldName}`} type={fieldTipo} />
                    </div>
                );
            });
            return labelField;
        } catch (error) {
            return labelField;
        }
    }

    const enviarDados = function(){

        let nomeTabela,dadosEmJSON,msg;
        
        dadosEmJSON = {}
        // Coletar dados preenchidos nos campos e colocamos no formato json
        document.querySelectorAll(".input__content--field").forEach((obj)=>{
            dadosEmJSON[obj.classList[1]] = obj.value;            
        });

        // verifico qual o endpoint de acordo com a tabela
        nomeTabela = document.querySelector('.input__titulo_tabela').textContent;

        // Pequeno ajuste de nomes:
        if (nomeTabela == 'Artista'){
            nomeTabela = 'artistas';
        }
        else if (nomeTabela == 'Colecao'){
            nomeTabela = 'colecoes';
        }
        
        // dou GET nos ENDPOINTS como JSON e ja faco um POST com os dados preechidos nos formularios
        const urlServidor = 'http://127.0.0.1:8000/';
        axios(urlServidor).then((response)=>{
            const endPointList = response.data;
            
            const endPoint = endPointList[nomeTabela.toLowerCase()];
            
            axios.post(endPoint,dadosEmJSON).then((response)=>{
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });
            // ExportDataPython(endPoint,dadosEmJSON).then((response)=>{
            //     console.log(response);
            // }).catch((error)=>{
            //     console.log(error);
            // });
        });

    }

    return (
        <div className="formulario__scroll" >
            <div className="input__titulo_tabela">{props.tabelaEscolhida}</div>            
            <div className="btn pressing btn__input--atualizar" onClick={enviarDados}>Atualizar</div>
            {gerarFields()}            
        </div>
    );
}