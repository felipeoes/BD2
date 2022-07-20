import React, { useEffect, useState } from "react";
import { HomePage } from "./../views/HomePage";
import { InputPage } from "./../views/InputPage";
import { TablePage } from "./../views/TablePage";
import { GraphPage } from "./../views/GraphPage";

export const SelectPages = function (props) {
  const renderSelectPage = function (page) {
    if (page == "home") {
      return <HomePage />;
    } else if (page == "input") {
      return <InputPage />;
    } else if (page == "table") {
      return <TablePage />;
    } else if (page == "graph") {
      return <GraphPage />;
    } else {
      throw Error("Opcao de botao no navegador nao existe! Rever o codigo!");
    }
  };

  return <div className="Content">{renderSelectPage(props.page)}</div>;
};
