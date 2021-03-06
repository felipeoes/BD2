import React, {useEffect, useState} from "react";
import { SelectPages } from "./SelectPages";

export const Navbar = function (){
    const [page,setPage] = useState('home');

    // useEffect(()=>{
    //     console.log(page);
    // },[]);

    const fRenderPage = function(e){

        const chosenPage = e.target.classList[0].split('--')[1];
        setPage(chosenPage);
    };

    return (
        <div>
            <div className="navigation">
                <div className="navigation__button navigation__button--logo">
                </div>
                <div className="navigation__button--home navigation__button btn pressing" onClick={fRenderPage}></div>
                <div className="navigation__button--input navigation__button btn pressing" onClick={fRenderPage}></div>
                <div className="navigation__button--table navigation__button btn pressing" onClick={fRenderPage}></div>
                <div className="navigation__button--graph navigation__button btn pressing" onClick={fRenderPage}></div>
            </div>
                     
            
            <SelectPages page={page}/>
        </div>
    );
}