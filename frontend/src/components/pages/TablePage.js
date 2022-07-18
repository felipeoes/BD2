import React, {useEffect, useState} from "react";
import dadosAPI from "../services/api";
import { importConsultaTable } from "../services/api";
import { Tables } from "../Tables";


export const TablePage = function (props){
    const [opcoesSelecionadas,setOpcoesSelecionadas] = useState(['artista']);
    const [dadosConsulta,setDadosConsulta] = useState('');
    const [dadosConsultaEscolhida,setDadosConsultaEscolhida] = useState();
    const [listaOpcoes,setListaOpcoes] = useState();
    const seletor = document.querySelector('.opcao_lista--inputPage')?.value;
    useEffect(()=>{
        const resultadoPromise = importConsultaTable();
        let resultado = [];
        let chave;
        const camposFiltro = Object.keys(resultadoPromise);
        setListaOpcoes(camposFiltro);

        atualizarConsultas();
        
        resultadoPromise[camposFiltro[0]].then((a)=>setDadosConsultaEscolhida(a));

    },[]);

    const atualizarConsultas = function(){
        const resultado = importConsultaTable();
        setDadosConsulta(resultado);        
    };


    const mudarOpcoes = function(e){
        setOpcoesSelecionadas(e.target.value);
        dadosConsulta[e.target.value].then((a)=>setDadosConsultaEscolhida(a));
    }

    const gerarOpcoes = function(){
        return listaOpcoes?.map((opcao)=><option key={opcao}>{opcao}</option>)
    }


    return (

        <div className="Content animacaoEntrada tablePage">
            <div className="input__menu">
                <div className="input__menu__coluna ">
                    <div className="btn pressing btn__input--atualizar" onClick={atualizarConsultas}>Atualizar</div>
                    <label className="lista_label" htmlFor='Consultas'>Consultas</label>
                    <select className = "opcao_lista opcao_lista--inputPage" name="opcao_lista" onChange={mudarOpcoes}>
                        {gerarOpcoes()}
                    </select>                    

                </div>
            </div>
            <div className="tablePage__content">
                <Tables dadosConsultaEscolhida={dadosConsultaEscolhida}/>
            </div>
        </div>
    );
}