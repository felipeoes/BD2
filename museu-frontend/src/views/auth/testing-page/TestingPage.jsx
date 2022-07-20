/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { IconButton, MenuItem, Select } from "@mui/material";
import { LogsPageButtonsContainer } from "../logs-page/styles";
import { TestingContainer } from "./styles";
import AuthContext from "../../../contexts/auth";
import Loading from "../../../components/loading/Loading";
import Button from "../../../components/button/Button";
import { useTheme } from "styled-components";
import TabPanels from "../../../components/tabPanel/TabPanel";
import TabVars from "./tabs-content/TabVars";
import TabPredicted from "./tabs-content/TabPredicted";

import { MdOutlineUploadFile } from "react-icons/md";
import { InputPage } from "./inputPage/InputPage";

export default function TestingPage() {
  const [models, setModels] = useState([]);
  const [testingModel, setTestingModel] = useState({
    variaveis: [],
  });
  const [testingVariables, setTestingVariables] = useState(getVariables());
  const [dataset, setDataset] = useState([]);
  const [predicted, setPredicted] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const context = useContext(AuthContext);
  const theme = useTheme();

  let params = useParams();

  function capitalize(platformName) {
    return platformName.charAt(0).toUpperCase() + platformName.slice(1);
  }

  function handleChangeModel(event) {
    const newModel = event.target.value;

    // atualiza modelo selecionado
    setTestingModel(newModel);

    // atualiza variáveis
    setTestingVariables(getVariables(newModel));
  }

  function getVariables(model) {
    !model && (model = testingModel);
    return model.variaveis.map((variable) => ({
      name: variable,
      value: "",
    }));
  }

  function processCSV(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    // seleciona somente as colunas iguais às variáveis do modelo selecionado
    const variables = testingModel.variaveis;
    const variablesIndexes = variables.map((variable) =>
      headers.indexOf(variable)
    );

    for (let i = 1; i < lines.length - 1; i++) {
      const row = lines[i].split(",");
      const data = {};
      variablesIndexes.forEach((index, i) => {
        data[variables[i]] = row[index];
      });
      result.push(data);
    }

    return result;
  }

  async function handleOnClickUploadCSV(e) {
    setLoading(true);

    // Abre diálogo de upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";

    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target.result;
        // processa csv
        const dataset = processCSV(data);
        setDataset(dataset);

        await handleOnClickTest(e, dataset);
        setLoading(false);
      };
      reader.readAsText(file);
    };

    input.click();
  }

  async function handleOnClickTest(e, bulkTest) {
    setActiveTab(1);
    setLoading(true);

    const data = {
      modelo: testingModel.nome,
      modelo_ref: testingModel.modelo_ref,
    };

    if (!bulkTest) {
      data["dados"] = [testingVariables.map((variable) => variable.value)];
    } else {
      // cria lista com os valores das variáveis
      const values = bulkTest.map((row) => Object.values(row));
      data["dados"] = values;
    }

    const response = await context.GetPrediction(data);

    if (response) {
      setPredicted(response);
    }

    setLoading(false);
  }

  useEffect(() => {
    async function getModels() {
      const response = await context.GetModels();

      const modelId = parseInt(params.modelId);

      if (response.length > 0 && modelId) {
        setModels(response);

        const model = response.find((model) => model.id === modelId);
        setTestingModel(model);
        setTestingVariables(getVariables(model));
      } else if (response.length > 0) {
        setModels(response);

        const model = response[0];
        setTestingModel(model);
        setTestingVariables(getVariables(model));
      }
    }

    getModels();

    setLoading(false);
  }, [params.modelId]);

  const tabs = [
    {
      label: "Variáveis",
      content: (
        <TabVars
          variables={testingVariables}
          setTestingVariables={setTestingVariables}
        />
      ),
    },
    {
      label: "Predição",
      content: <TabPredicted predicted={predicted} />,
    },
  ];

  return (
    <TestingContainer>
      {loading ? (
        <Loading loadingSize={50} />
      ) : (
       
        <div style={{ maxHeight: 200, width: "100%" }}>
           <InputPage />
           </div>
        //   <LogsPageButtonsContainer>
        //     <Select
        //       label="Modelo de teste"
        //       sx={{
        //         // color: platform.color,

        //         color: theme.colors.terciary,
        //         marginLeft: 4,
        //         mr: { xs: 2, sm: 2 },
        //         height: 36,
        //         width: 160,
        //         fontFamily: "InterMedium",
        //         fontSize: 14,
        //       }}
        //       labelId="simple-select-filled-label"
        //       id="simple-select-filled"
        //       value={testingModel}
        //       onChange={(e) => handleChangeModel(e)}
        //     >
        //       {Object.keys(models).map((key) => (
        //         <MenuItem value={models[key]}>
        //           {capitalize(models[key].nome)}
        //         </MenuItem>
        //       ))}
        //     </Select>
        //     <div style={{ display: "flex" }}>
        //       <IconButton
        //         sx={{ marginTop: -0.8, marginRight: 2 }}
        //         onClick={handleOnClickUploadCSV}
        //       >
        //         <MdOutlineUploadFile size={32} color={theme.colors.iconColor} />
        //       </IconButton>

        //       <Button
        //         width={260}
        //         height={36}
        //         bgColor={theme.colors.primary}
        //         marginRight={20}
        //         onClick={handleOnClickTest}
        //       >
        //         Realizar teste
        //       </Button>
        //     </div>
        //   </LogsPageButtonsContainer>
        //   <p
        //     style={{
        //       fontStyle: "InterSemiBold",
        //       fontSize: 20,
        //       textAlign: "center",
        //     }}
        //   >
        //     {testingModel
        //       ? `Modelo: ${testingModel.nome} - ${testingModel.variaveis.length} variáveis`
        //       : ""}
        //   </p>
        //   <div
        //     style={{
        //       marginLeft: 30,
        //       overflow: "auto",
        //       maxHeight: 480,
        //       // display: "flex",
        //       // flexWrap: "wrap",
        //       // justifyContent: "center",
        //       // width: "100%",
        //     }}
        //   >
        //     <TabPanels tabs={tabs} activeTab={activeTab} />
        //   </div>
        // </div>
      )}
    </TestingContainer>
  );
}
