'use strict'
import React, {useEffect, useState} from "react";

export const Formularios = function (props){
    
    const gerarFields = function(){
        let labelField = []
        props.camposFormulario.forEach(element => {
            let fieldName = Object.keys(element)[0];
            let fieldTipo = Object.values(element)[0];
            labelField.push(
                <div key={fieldName} className="input__content--linha">
                    <div className="input__content--label">{fieldName}</div>
                    <input className="input__content--field" type={fieldTipo} />
                </div>
            );
        });
        return labelField;

    }

    const enviarDados = function(){
        console.log('foi');
    }

    return (
        <div >
            <div className="input__titulo_tabela">{props.tabelaEscolhida}</div>            
            <div className="btn pressing btn__input--atualizar" onClick={enviarDados}>Atualizar</div>
            {gerarFields()}            
        </div>
    );
}