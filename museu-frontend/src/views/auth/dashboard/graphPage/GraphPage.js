/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { BarChart } from "../../../../components/BarChart";
import { LineChart } from "../../../../components/LineChart";

// import { botoes } from "../services/api";
import dadosAPI from "../../../../components/services/api";
import { filtros, groupBySum } from "../../../../components/services/utils";
import { PieChart } from "../../../../components/PieChart";
import { TreeMap } from "../../../../components/TreeMap";
import { importConsultaGraph } from "../../../../components/services/api";

export const GraphPage = function (props) {
  // const dataBarChart1 = dadosAPI.dataBarChart1;
  // const dataLinearChart = dadosAPI.dataLinearChart;
  // const dataPieChart = dadosAPI.dataPieChart;
  // const dataTreeMap = dadosAPI.dataTreeMap;

  const [dataLinearChart, setDataLinearChart] = useState();
  // const [dataBarChart1,setDataBarChart1] = useState();

  const botoesInicial = {
    1: {
      label: "X",
      opcoes: ["TODOS"],
    },
    2: {
      label: "ano",
      opcoes: ["TODOS"],
    },
  };

  const [botoes, setBotoes] = useState(botoesInicial);

  const [opcoesSelecionadas, setOpcoesSelecionadas] = useState();
  const [dataBarChartFiltered, setdataBarChartFiltered] =
    useState(dataLinearChart);
  const [dataBarChartFilteredQuantidade, setdataBarChartFilteredQuantidade] =
    useState(dataLinearChart);
  const [dataLinearChartFiltered, setdataLinearChartFiltered] =
    useState(dataLinearChart);
  const [
    dataLinearChartFilteredQuantidade,
    setdataLinearChartFilteredQuantidade,
  ] = useState(dataLinearChart);
  // const [datadataTreeMapFiltered,setdatadataTreeMapFiltered] = useState(dataTreeMap);
  const [dataPieChart, setDataPieChart] = useState();
  const [dataTreeMap, setDataTreeMap] = useState();
  const [dataTreeMap2, setDataTreeMap2] = useState();

  const [dadosConsulta, setDadosConsulta] = useState();

  const [custoTotal, setCustoTotal] = useState();
  const [quantidadeTotal, setQuantidadeTotal] = useState();

  let dadoFiltrado, dadoFiltrado2;

  // const dadoFiltrado = {...dataLinearChart};

  useEffect(() => {
    const resultadoPromise = importConsultaGraph();
    const camposFiltro = Object.keys(resultadoPromise);

    resultadoPromise[camposFiltro[1]].then((listaBotoes) => {
      setBotoes(listaBotoes);
    });

    resultadoPromise[camposFiltro[0]].then((dataLineChartPromise) => {
      setDataLinearChart(dataLineChartPromise);

      const selecionadoresOpcao = document.querySelectorAll(".opcao_lista");
      const selecionadoresLabel = document.querySelectorAll(".lista_label");

      const valorInicial = {};

      resultadoPromise[camposFiltro[1]].then((listaBotoes) => {
        Object.values(listaBotoes).forEach((linha) => {
          valorInicial[linha.label] = linha.opcoes[0];
        });

        setOpcoesSelecionadas(valorInicial);

        // Atualizo o valor inicial dos dados de barra com base no dado consultado da API
        dadoFiltrado = filtros(dataLineChartPromise, valorInicial);
        dadoFiltrado2 = groupBySum(dadoFiltrado, "ano", "custo");
        setdataBarChartFiltered(dadoFiltrado2);

        dadoFiltrado2 = groupBySum(dadoFiltrado, "ano", "quantidade");
        setdataBarChartFilteredQuantidade(dadoFiltrado2);

        // Atualizo o valor inicial dos dados do grafico de linha com base no dado consultado da API
        dadoFiltrado = filtros(dataLineChartPromise, valorInicial);

        dadoFiltrado2 = groupBySum(dadoFiltrado, "data", "custo");

        setdataLinearChartFiltered(dadoFiltrado2);

        dadoFiltrado2 = groupBySum(dadoFiltrado, "data", "quantidade");

        setdataLinearChartFilteredQuantidade(dadoFiltrado2);

        // Atualizo o valor inicial dos dados do grafico de piechart com base no dado consultado da API
        dadoFiltrado = filtros(dataLineChartPromise, valorInicial);
        const pieChartRaw = groupBySum(dadoFiltrado, "categoria", "quantidade");

        let pieChartReady = {};

        pieChartRaw.map((item) => {
          if (item["categoria"] != "TODOS")
            pieChartReady[item["categoria"]] = item["quantidade"];
        });

        setDataPieChart(pieChartReady);

        // Atualizo o valor inicial dos dados do grafico de treegroup com base no dado consultado da API
        dadoFiltrado = filtros(dataLineChartPromise, valorInicial);
        let treeMapRaw = groupBySum(dadoFiltrado, "categoria", "custo");

        let treeMapReady = [];
        treeMapRaw.map((item) => {
          if (item["categoria"] != "TODOS") {
            treeMapReady.push({
              name: item["categoria"],
              parent: "Origin1",
              value: item["custo"],
            });
          }
          return item;
        });
        treeMapReady.push({
          name: "Origin1",
          parent: "",
          value: "",
        });
        setDataTreeMap(treeMapReady);

        // Atualizo o valor inicial dos dados do grafico de treegroup com base no dado consultado da API
        dadoFiltrado = filtros(dataLineChartPromise, valorInicial);
        treeMapRaw = groupBySum(dadoFiltrado, "tipo", "custo");

        treeMapReady = [];
        treeMapRaw.map((item) => {
          if (item["tipo"] != "TODOS") {
            treeMapReady.push({
              name: item["tipo"],
              parent: "Origin2",
              value: item["custo"],
            });
          }
          return item;
        });
        treeMapReady.push({
          name: "Origin2",
          parent: "",
          value: "",
        });
        setDataTreeMap2(treeMapReady);

        //Atualizar valores do cabeçalho
        dadoFiltrado = filtros(dataLineChartPromise, valorInicial);
        let aux = groupBySum(dadoFiltrado, "tipo", "custo");
        const custoTotalAux = aux
          .map((item) => {
            return item["custo"];
          })
          .reduce((acc, v) => acc + v, 0);

        setCustoTotal(custoTotalAux);

        aux = groupBySum(dadoFiltrado, "tipo", "quantidade");
        const quantidadeTotalAux = aux
          .map((item) => {
            return item["quantidade"];
          })
          .reduce((acc, v) => acc + v, 0);

        setQuantidadeTotal(quantidadeTotalAux);
      });
    });
  }, []);

  const mudarOpcoes = function (e) {
    let novo_valor;
    if (isNaN(parseInt(e.target.value))) {
      novo_valor = {
        [e.target.id]: e.target.value,
      };
    } else {
      novo_valor = {
        [e.target.id]: parseInt(e.target.value),
      };
    }
    const opcoesSelecionadas_aux = { ...opcoesSelecionadas };

    opcoesSelecionadas_aux[e.target.id] = e.target.value;

    setOpcoesSelecionadas(opcoesSelecionadas_aux);

    // Atualizo o valor inicial dos dados de barra com base no dado consultado da API
    // Filtrar dados para o grafico de barras
    dadoFiltrado = filtros(dataLinearChart, opcoesSelecionadas_aux);
    dadoFiltrado2 = groupBySum(dadoFiltrado, "ano", "custo");
    setdataBarChartFiltered(dadoFiltrado2);

    dadoFiltrado2 = groupBySum(dadoFiltrado, "ano", "quantidade");
    setdataBarChartFilteredQuantidade(dadoFiltrado2);

    // Filtrar dados para o grafico de pizza

    // Filtrar dados para o grafico de linha
    dadoFiltrado = filtros(dataLinearChart, opcoesSelecionadas_aux);
    dadoFiltrado2 = groupBySum(dadoFiltrado, "data", "custo");

    setdataLinearChartFiltered(dadoFiltrado2);

    dadoFiltrado2 = groupBySum(dadoFiltrado, "data", "quantidade");
    setdataLinearChartFilteredQuantidade(dadoFiltrado2);

    dadoFiltrado = filtros(dataLinearChart, opcoesSelecionadas_aux);
    const pieChartRaw = groupBySum(dadoFiltrado, "categoria", "quantidade");
    let pieChartReady = {};
    pieChartRaw.map((item) => {
      if (item["categoria"] != "TODOS")
        pieChartReady[item["categoria"]] = item["quantidade"];
    });

    setDataPieChart(pieChartReady);

    // Atualizo o valor inicial dos dados do grafico de treegroup com base no dado consultado da API
    dadoFiltrado = filtros(dataLinearChart, opcoesSelecionadas_aux);
    let treeMapRaw = groupBySum(dadoFiltrado, "categoria", "custo");

    let treeMapReady = [];
    treeMapRaw.map((item) => {
      if (item["categoria"] != "TODOS") {
        treeMapReady.push({
          name: item["categoria"],
          parent: "Origin1",
          value: item["custo"],
        });
      }
      return item;
    });
    treeMapReady.push({
      name: "Origin1",
      parent: "",
      value: "",
    });
    setDataTreeMap(treeMapReady);

    // Atualizo o valor inicial dos dados do grafico de treegroup com base no dado consultado da API
    dadoFiltrado = filtros(dataLinearChart, opcoesSelecionadas_aux);
    treeMapRaw = groupBySum(dadoFiltrado, "tipo", "custo");

    treeMapReady = [];
    treeMapRaw.map((item) => {
      if (item["tipo"] != "TODOS") {
        treeMapReady.push({
          name: item["tipo"],
          parent: "Origin2",
          value: item["custo"],
        });
      }
      return item;
    });
    treeMapReady.push({
      name: "Origin2",
      parent: "",
      value: "",
    });
    setDataTreeMap2(treeMapReady);

    //Atualizar valores do cabeçalho

    dadoFiltrado = filtros(dataLineChartPromise, valorInicial);
    let aux = groupBySum(dadoFiltrado, "tipo", "custo");
    const custoTotalAux = aux
      .map((item) => {
        return item["custo"];
      })
      .reduce((acc, v) => acc + v, 0);

    setCustoTotal(custoTotalAux);

    aux = groupBySum(dadoFiltrado, "tipo", "quantidade");
    const quantidadeTotalAux = aux
      .map((item) => {
        return item["quantidade"];
      })
      .reduce((acc, v) => acc + v, 0);

    setQuantidadeTotal(quantidadeTotalAux);
  };

  const atualizarConsultas = function () {
    const resultado = importConsultaGraph();
    setDadosConsulta(resultado);
  };

  const geracao_opcoes = function () {
    const plot = function (botao) {
      // const nome = 'opcao_lista_'.concat(numero);
      return (
        <div key={botao.label} className="graph__menu__coluna ">
          <label className="lista_label" htmlFor={botao.label}>
            {botao.label}
          </label>
          <select
            className="opcao_lista"
            name="opcao_lista"
            id={botao.label}
            onChange={mudarOpcoes}
          >
            {botao.opcoes.map((opcao, _id) => (
              <option key={_id}>{opcao}</option>
            ))}
          </select>
        </div>
      );
    };

    // Renderizo as opcoes vinda pelo JSON da API
    return Object.values(botoes).map(plot);
  };

  return (
    <div className="Content animacaoEntrada graphPage">
      <div className="graph__menu">{geracao_opcoes()}</div>
      <div className="graph__content">
        <div className="graph__header">
          <div className="graph__header__number graph__header__number--custo">
            <span className="graph__header__number--label">Custo Total</span>{" "}
            <span className="graph__header__number--value">
              R$ {custoTotal}
            </span>
          </div>
          <div className="graph__header__number graph__header__number--quantidade">
            <span className="graph__header__number--label">
              Quantidade Total
            </span>{" "}
            <span className="graph__header__number--value">
              {quantidadeTotal}
            </span>
          </div>
        </div>
        <div className="graph__plot">
          <BarChart
            data={[dataBarChartFiltered, "ano", "custo"]}
            tituloGrafico="Custo Total de Objetos Comprados por Ano"
            tituloEixoY="Custo ($)"
          />
          <LineChart
            data={[dataLinearChartFiltered, "data", "custo"]}
            tituloGrafico="Série Temporal do Custo Mensal de Objetos Comprados"
            tituloEixoY="Custo ($)"
          />
          <BarChart
            data={[dataBarChartFilteredQuantidade, "ano", "quantidade"]}
            tituloGrafico="Quantidade de Objetos Comprados por Ano"
            tituloEixoY="Quantidade"
          />
          <LineChart
            data={[dataLinearChartFilteredQuantidade, "data", "quantidade"]}
            tituloGrafico="Série Temporal da Quantidade Mensal de Objetos Comprados"
            tituloEixoY="Quantidade"
          />
          <PieChart
            data={[dataPieChart]}
            tituloGrafico="Quantidade de Objetos por Categoria"
          />
          <div className="graph__dataTreeMap">
            <TreeMap
              data={[dataTreeMap, ["Origin2"]]}
              tituloGrafico="Árvore agrupada de Custo por Categoria"
            />
            <TreeMap
              data={[dataTreeMap2, ["Origin2"]]}
              tituloGrafico="Árvore agrupada de Custo por Tipo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
