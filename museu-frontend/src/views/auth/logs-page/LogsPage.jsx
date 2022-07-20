/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  LogsPageContainer,
  LogsPageButtonsContainer,
  ViewContainer,
} from "./styles";
import AuthContext from "../../../contexts/auth";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import DynamicTable from "./../../../components/dynamicTable/DynamicTable";

import useWindowDimensions, {
  totalHeaderHeight,
} from "../../../services/utils/useWindowsDimensions";
import Filter from "../../../components/filter/Filter";
import ServicesModal from "../../../components/modal/Modal";
import Loading from "../../../components/loading/Loading";

export default function LogsPage() {
  const theme = useTheme();

  const [data, setData] = useState({ errorMessage: "", isLoading: true });
  const [models, setModels] = useState({
    emprestados: [],
    artistas: [],
    colecoes: [],
    esculturas: [],
    exposicoes: [],
    expostoem: [],
    objetosarte: [],
    outros: [],
    permanentes: [],
    pinturas: [],
  });
  const [columns, setColumns] = useState([]);
  const [uploadModal, setUploadModal] = useState(null);
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [buttonLoading, setButtonLoading] = useState({
    downloadRaw: false,
    downloadCSV: false,
  });
  const context = useContext(AuthContext);

  // const { gitupper_id, bee_id, bee_submissions } = state.user;
  const [viweingLogs, setViweingLogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);
  const [model, setModel] = useState({});

  const { height } = useWindowDimensions();
  const maxHeight = height - totalHeaderHeight;

  function disabledInteractions() {
    return viweingLogs.length === 0 || data.isLoading;
  }

  function updateColumns(vieweingLogs) {
    const updatingKeys = Object.keys(vieweingLogs[0]).filter(
      (key) => key !== "modelo"
    );

    let shouldAddKey = false;
    const keyColumn = updatingKeys.filter((key) => key === "id");

    if (keyColumn.length <= 0) {
      shouldAddKey = true;
    }

    const columns = updatingKeys.map((key) => {
      return key === "id"
        ? {
            id: key,
            numeric: !isNaN(vieweingLogs[key]),
            disablePadding: true,
            label: `# ${key.toUpperCase()}`,
            align: "center",
            icon: "",
            filter: "",
          }
        : {
            id: key,
            numeric: !isNaN(vieweingLogs[key]),
            disablePadding: false,
            label: key,
            align: "left",
            icon: "",
            filter: "",
          };
    });

    if (shouldAddKey) {
      columns.unshift({
        id: "id",
        numeric: true,
        disablePadding: true,
        label: "# ID",
        align: "center",
        icon: "",
        filter: "",
      });
    }

    // remove a coluna de nome "coluna"
    columns.splice(columns.indexOf("coluna"), 1);

    // coloca id como primeira coluna
    columns.unshift(columns.splice(columns.indexOf("id"), 1)[0]);

    setColumns(columns);
  }

  useEffect(() => {
    async function getModels() {
      const fieldNames = Object.keys(models);

      const fetchingModels = Object.keys(models).map(async (model) => {
        try {
          let endpoint = `${model}/`;
          const response = await context.GetModel(endpoint);
          return response;
        } catch (error) {
          console.log(error);
          setData({ errorMessage: error.message, isLoading: false });
        }
      });

      const responses = await Promise.all(fetchingModels);

      // Popula o objeto models com os dados de cada modelo
      const newModels = {};
      fieldNames.forEach((field, index) => {
        newModels[field] = responses[index];
      });

      //  Para cada modelo, cria uma coluna de id com o a ordem do array e outra coluna com o nome do modelo
      Object.keys(newModels).map((model) => {
        newModels[model].coluna = model;
        newModels[model].forEach((log, index) => {
          log.id = index;
          log.coluna = model;
        });
      });

      const actualModel = newModels[Object.keys(newModels)[0]];
      setModel(actualModel);

      setModels(newModels);

      setViweingLogs(actualModel);
      updateColumns(actualModel);
      setRows(newModels);

      setData({ errorMessage: "", isLoading: false });
    }

    getModels();
  }, []);

  function handleChangeModel(event) {
    const newModel = event.target.value;

    // atualiza modelo selecionado
    setModel(newModel);

    // atualiza logs
    const newLogs = rows[newModel.coluna];

    // remove os antigos
    // setViweingLogs([]);
    updateColumns([...newLogs]);
    setViweingLogs([...newLogs]);
  }

  function convertToCSV(arr) {
    const array = [Object.keys(arr[0])].concat(arr);

    return array
      .map((it) => {
        return Object.values(it).toString();
      })
      .join("\n");
  }

  async function handleOnDownloadCSVLogs() {
    setButtonLoading({ ...buttonLoading, downloadCSV: true });

    let csv_data = "data:text/csv;charset=utf-8," + convertToCSV(selectedLogs);

    let encodedUri = encodeURI(csv_data);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dados_${model.coluna}.csv`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      setButtonLoading({ ...buttonLoading, downloadCSV: false });
    }, 1000);
  }

  function handleOnDownloadRawLogs() {
    setButtonLoading({ ...buttonLoading, downloadRaw: true });

    let raw_data =
      "data:text/json;charset=utf-8," +
      JSON.stringify(selectedLogs.map((log) => log));

    let encodedUri = encodeURI(raw_data);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dados_${model.coluna}.json`);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      setButtonLoading({ ...buttonLoading, downloadRaw: false });
    }, 1000);
  }

  return (
    <LogsPageContainer>
      <ViewContainer>
        <LogsPageButtonsContainer>
          <Filter
            columns={columns}
            filteringRows={viweingLogs}
            setFilteredRows={setRows}
            setSearchingValue={(value) => {
              setSearchText(value);
            }}
            searchValue={searchText}
            // langOptions={langOptions}
            disabled={disabledInteractions()}
          />

          <FormControl
            variant="outlined"
            sx={{
              backgroundColor: theme.colors.white,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              marginLeft: 4,

              marginTop: -15,
              minWidth: 165,
            }}
          >
            <Select
              sx={{
                mr: { xs: 2, sm: 2 },
                height: 36,
                width: 160,
                zIndex: 1300,
                fontFamily: "InterMedium",
                fontSize: 14,
              }}
              labelId="simple-select-filled-label"
              id="simple-select-filled"
              value={model}
              onChange={(e) => handleChangeModel(e)}
            >
              {Object.keys(models).map((key) => (
                <MenuItem value={models[key]}>{key}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </LogsPageButtonsContainer>

        {data.isLoading ? (
          <div
            style={{
              display: "flex",
              height: "50%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loading loadingSize={50} />
          </div>
        ) : viweingLogs.length > 0 ? (
          <DynamicTable
            rowsPerPage={viweingLogs ? 50 : 0}
            rows={viweingLogs}
            columns={columns}
            searchingValue={searchText}
            getSelected={(selected) => setSelectedLogs(selected)}
            maxHeight={maxHeight}
            platform={model.coluna}
            buttonLoading={buttonLoading}
            handleOnDownloadCSVLogs={handleOnDownloadCSVLogs}
            handleOnDownloadRawLogs={handleOnDownloadRawLogs}
          />
        ) : (
          <div>
            <p>Sem dados desta tabela</p>
          </div>
        )}
      </ViewContainer>
    </LogsPageContainer>
  );
}
