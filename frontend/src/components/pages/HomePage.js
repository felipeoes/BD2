import React, {useEffect, useState} from "react";

export const HomePage = function (props){

    return (
        <div className="Content animacaoEntrada">
            <header className="header">
                <div className="page__title">Home</div>
                <section className="section__group">
                    <div className="page__description">Projeto desenvolvido pelos alunos:</div>
                    <div className="table">
                        <div className="table__column">
                            <div className="table__row section__group--names">
                                Fábio Heiji Yamada
                            </div>
                            <div className="table__row section__group--names">
                                Fábio Luis Ameixieira Santos
                            </div>
                            <div className="table__row section__group--names">
                                Felipe Oliveira do Espirito Santo
                            </div>
                            <div className="table__row section__group--names">
                                Fernando José Germinio Fenley
                            </div>
                        </div>
                        <div className="table__column">
                            <div className="table__row section__group--names">
                                5690618
                            </div>
                            <div className="table__row section__group--names">
                                11795505
                            </div>
                            <div className="table__row section__group--names">
                                11925242
                            </div>
                            <div className="table__row section__group--names">
                                11207630
                            </div>
                        </div>
                    </div>
                        
                </section>
            </header>
            <main className="main">

            </main>
            <footer className="footer"></footer>
        </div>
    );
}