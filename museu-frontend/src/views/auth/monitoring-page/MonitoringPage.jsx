import Chart from "../../../components/chart/Chart";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../contexts/auth";
import Loading from "../../../components/loading/Loading";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const VALUES_SELECT = ["Tipo", "Categoria", "Colecao"];
const VALUES_TITLE = [
  "Custo total por ano dos objetos de arte, separados por tipo",
  "Custo total por ano dos objetos de arte, separados por categoria",

  "Custo total por ano dos objetos de arte, separados por coleção",
];

export default function MonitoringPage() {
  const context = useContext(AuthContext);
  const [groupedData, setGroupedData] = useState({});
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState({});
  const [filteringOption, setFilteringOption] = useState(VALUES_SELECT[0]);
  const [title, setTitle] = useState(VALUES_TITLE[0]);
  const [emprestados, setEmprestados] = useState([]);
  const [loading, setLoading] = useState(true);

  function makeChartDataByType(data) {
    const chartData = [];
    const chartLabels = [];

    const types = ["Emprestado", "Permanente"];

    types.forEach((type) => {
      const typeData = data.filter((item) => item.tipo === type);

      const typeChartData = {
        name: type,
        type: "line",
        fill: "solid",
        data: [],
      };

      typeData.forEach((item) => {
        const year = item.ano;
        const month = item.mes;
        const date = item.data ? item.data : "2022-01-01";
        const category = item.categoria;
        const quantity = item.quantidade;
        const cost = item.custo;

        chartLabels.push(`${date}`);

        typeChartData.data.push(cost);
      });

      chartData.push(typeChartData);
    });
    setChartData(chartData);
    setChartLabels(chartLabels);
    setFilteringOption(VALUES_SELECT[0]);
    setTitle(VALUES_TITLE[0]);
  }

  function makeChartDataByCategory(data) {
    const chartData = [];
    const chartLabels = [];

    const categories = ["Outros", "Pinturas", "Esculturas"];

    categories.forEach((category) => {
      const categoryData = data.filter((item) => item.categoria === category);

      const categoryChartData = {
        name: category,
        type: "line",
        fill: "solid",
        data: [],
      };

      categoryData.forEach((item) => {
        const year = item.ano;
        const month = item.mes;
        const date = item.data ? item.data : "2022-01-01";
        const type = item.tipo;
        const quantity = item.quantidade;
        const cost = item.custo;

        chartLabels.push(`${date}`);

        categoryChartData.data.push(cost);
      });

      chartData.push(categoryChartData);
    });
    setChartData(chartData);
    setChartLabels(chartLabels);
    setFilteringOption(VALUES_SELECT[1]);
    setTitle(VALUES_TITLE[1]);
  }

  function makeChartDataByCollection(data) {
    const chartData = [];
    const collections = ["primavera", "outono", "verao"];

    // remove o campo "TODOS" do objeto de dados
    delete data["TODOS"];

    collections.forEach((collection) => {
      const collectionData = Object.keys(data).map((year) => {
        return {
          year: year,
          [collection]: data[year][collection],
        };
      });

      const collectionChartData = {
        name: collection,
        type: "line",
        fill: "solid",
        data: [],
      };

      collectionData.forEach((item) => {
        const year = item.year;
        const cost = item[collection];

        collectionChartData.data.push(cost);
      });

      chartData.push(collectionChartData);
    });

    const chartLabels = Object.keys(data).map((year) => year);
    setChartData(chartData);
    setChartLabels(chartLabels);
    setFilteringOption(VALUES_SELECT[2]);
    setTitle(VALUES_TITLE[2]);
  }

  function handleChangeData(e) {
    const { value } = e.target;

    if (value === "Categoria") {
      makeChartDataByCategory(groupedData);
    }
    if (value === "Tipo") {
      makeChartDataByType(groupedData);
    }
    if (value === "Colecao") {
      makeChartDataByCollection(emprestados);
    }
  }

  let calls = 0;
  useEffect(() => {
    async function getGroupedData() {
      const res = [];
      const response = await context.GetGroupedData();
      if (response) {
        res.push(response);
      }

      const res_col = await context.GetTotalCostByYearByCollection();
      if (res_col) {
        res.push(res_col);
      }

      setGroupedData(res[0]);
      setEmprestados(res[1]);
      makeChartDataByType(res[0]);

      setLoading(false);
    }
    if (calls === 0) {
      getGroupedData();
    }
    calls++;
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ marginTop: 100 }}>
          <Loading />
        </div>
      ) : (
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <Select
            sx={{
              mr: { xs: 2, sm: 2 },
              height: 36,
              width: 160,
              zIndex: 1300,
              fontFamily: "InterMedium",
              fontSize: 14,
              mb: 2,
            }}
            labelId="simple-select-filled-label"
            id="simple-select-filled"
            label="Agrupamento"
            value={filteringOption}
            onChange={(e) => handleChangeData(e)}
          >
            {VALUES_SELECT.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
            {/* {Object.keys(models).map((key) => (
              <MenuItem value={models[key]}>{key}</MenuItem>
            ))} */}
          </Select>

          <Chart
            title={title}
            // subheader=""

            chartData={chartData}
            chartLabels={chartLabels}
            props={undefined}
          />
        </div>
      )}
    </div>
  );
}
