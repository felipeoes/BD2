import React, {useEffect, useState} from "react";
import { HomePage } from "./pages/homePage";
import { InputPage } from "./pages/inputPage";
import { TablePage } from "./pages/tablePage";
import { GraphPage } from "./pages/GraphPage";

export const SelectPages = function (props){
    const renderSelectPage = function(page){

        if (page == 'home'){
            return <HomePage/>;
        }
        else if (page == 'input'){
            return <InputPage/>;
        }
        else if (page == 'table'){
            return <TablePage/>;
        }
        else if (page == 'graph'){
            return <GraphPage/>;
        }
        else {
            throw Error('Opcao de botao no navegador nao existe! Rever o codigo!');
        }
    }

    return (
        <div className="Content">
            {renderSelectPage(props.page)}
        </div>
    );
}