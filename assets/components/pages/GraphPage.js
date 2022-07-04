import React, {useEffect, useState} from "react";
import { UseBarChart } from "../UseBarChart";
import { UseLineChart } from "../UseLineChart";
export const GraphPage = function (props){
    return (
        <div className="Content animacaoEntrada">
            <UseBarChart/>
            <UseLineChart/>
        </div>
    );
}