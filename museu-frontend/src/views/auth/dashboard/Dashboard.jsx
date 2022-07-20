/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { useTheme } from "styled-components";
import {
  ContentContainer,
  DashboardButtonsContainer,
  DashboardContainer,
} from "./styles";
import AuthContext from "../../../contexts/auth";
import ModelCard from "../../../components/modelCard/ModelCard";
import Button from "../../../components/button/Button";
import { Grid, Container, Box } from "@mui/material";

import Loading from "../../../components/loading/Loading";
import ServicesModal from "../../../components/modal/Modal";
import UploadModal from "./new-model-modal/NewModelModal";
import MetricCard from "./../../../components/metricCard/MetricCard";
import { MdMoveToInbox, MdSavings } from "react-icons/md";
import { Label } from "../../../components/input/styles";
import Chart from "../../../components/chart/Chart";
import { GraphPage } from "./graphPage/GraphPage";

const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
export default function Dashboard() {
  const context = useContext(AuthContext);
  const { user } = context;
  const theme = useTheme();

  const [groupedData, setGroupedData] = useState({});
  const [costByMonth, setCostByMonth] = useState([]);
  const [costByYear, setCostByYear] = useState([]);
  const [amountByMonth, setAmountByMonth] = useState([]);
  const [amountByYear, setAmountByYear] = useState([]);

  const [models, setModels] = useState([]);
  const [modelsTypes, setModelsTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newModelModal, setNewModelModal] = useState(null);

  function disabledButton(model) {
    return loading;
  }

  function getLastMonthTotalCost() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const year = lastMonth.getFullYear();

    let lastMonthTotalCost = 0;
    Object.keys(costByMonth[year]).forEach((month) => {
      if (month === lastMonth.getMonth().toString()) {
        lastMonthTotalCost = costByMonth[year][month];
      }
    });
    return lastMonthTotalCost;
  }

  function getActualMonthTotalCost() {
    const actualMonth = new Date();
    const year = actualMonth.getFullYear();

    let actualMonthTotalCost = 0;
    Object.keys(costByMonth[year]).forEach((month) => {
      if (month === actualMonth.getMonth().toString()) {
        actualMonthTotalCost = costByMonth[year][month];
      }
    });
    return actualMonthTotalCost;
  }

  function getLastYearTotalCost() {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    let lastYearTotalCost = 0;
    Object.keys(costByYear).forEach((year) => {
      if (year === lastYear.getFullYear().toString()) {
        lastYearTotalCost = costByYear[year];
      }
    });
    return lastYearTotalCost;
  }

  function getActualYearTotalCost() {
    const actualYear = new Date();

    let actualYearTotalCost = 0;
    Object.keys(costByYear).forEach((year) => {
      if (year === actualYear.getFullYear().toString()) {
        actualYearTotalCost = costByYear[year];
      }
    });
    return actualYearTotalCost;
  }

  function getLastMonthTotalAmount() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const year = lastMonth.getFullYear();

    let lastMonthTotalAmount = 0;
    Object.keys(amountByMonth[year]).forEach((month) => {
      if (month === lastMonth.getMonth().toString()) {
        lastMonthTotalAmount = amountByMonth[year][month];
      }
    });
    return lastMonthTotalAmount;
  }

  function getActualMonthTotalAmount() {
    const actualMonth = new Date();
    const year = actualMonth.getFullYear();

    let actualMonthTotalAmount = 0;
    Object.keys(amountByMonth[year]).forEach((month) => {
      if (month === actualMonth.getMonth().toString()) {
        actualMonthTotalAmount = amountByMonth[year][month];
      }
    });
    return actualMonthTotalAmount;
  }

  function getLastYearTotalAmount() {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    let lastYearTotalAmount = 0;
    Object.keys(amountByYear).forEach((year) => {
      if (year === lastYear.getFullYear().toString()) {
        lastYearTotalAmount = amountByYear[year];
      }
    });
    return lastYearTotalAmount;
  }

  function getActualYearTotalAmount() {
    const actualYear = new Date();

    let actualYearTotalAmount = 0;
    Object.keys(amountByYear).forEach((year) => {
      if (year === actualYear.getFullYear().toString()) {
        actualYearTotalAmount = amountByYear[year];
      }
    });

    return actualYearTotalAmount;
  }

  let calls = 0;
  useEffect(() => {
    // async function getGroupedData() {
    //   const response = await context.GetGroupedData();

    //   if (response) {
    //     setGroupedData(response);
    //   }
    // }

    async function getCosts() {
      const costFuncions = [
        context.GetTotalCostByMonth,
        context.GetTotalCostByYear,
        context.GetTotalAmountByMonth,
        context.GetTotalAmountByYear,
        // getGroupedData,
        // context.
      ];

      const fetchingCosts = costFuncions.map(async (func) => {
        const response = await func();
        return response;
      });

      const responses = await Promise.all(fetchingCosts);

      if (responses) {
        setCostByMonth(responses[0]);
        setCostByYear(responses[1]);
        setAmountByMonth(responses[2]);
        setAmountByYear(responses[3]);
      }

      setLoading(false);
    }

    if (calls === 0) {
      getCosts();
    }
    calls++;
  }, []);

  function handleOnClickAddModel() {
    newModelModal();
  }

  function handleOnAddNewModel(model) {
    setModels([...models, model]);
  }

  function handleOnUpdateModel(model) {
    const index = models.findIndex((m) => m.id === model.id);

    if (index >= 0) {
      models[index] = model;
      setModels([...models]);
    }
  }

  function handleOnRemoveModel(model) {
    const newModels = models.filter((m) => m.id !== model.id);

    setModels(newModels);
    context.DeleteModel(model.id);
  }
  function handleOnInvalidModel(model) {
    // Se não existe id, remove o último modelo da lista
    if (!model.id) {
      setModels(models.slice(0, -1));
    }
  }

  return (
    <DashboardContainer>
      <ServicesModal
        headless
        height={600}
        ModalContent={UploadModal}
        modalProps={{
          modelsTypes,
          handleOnAddNewModel,
          handleOnUpdateModel,
        }}
        setModalFunction={(f) => {
          setNewModelModal(f);
        }}
      />

      {/* <DashboardButtonsContainer>
        <Button
          width={160}
          height={36}
          fontSize={14}
          fontFamily="InterSemiBold"
          type="button"
          disableElevation
          bgColor={theme.colors.primary}
          onClick={handleOnClickAddModel}
          disabled={disabledButton()}
        >
          Adicionar modelo
        </Button>
      </DashboardButtonsContainer> */}
      {loading ? (
        <div style={{ marginTop: 100 }}>
          <Loading />
        </div>
      ) : (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 2,
            overflow: "auto",
            height: "100%",
          }}
        >
          <Container maxWidth={false} sx={{ overflow: "auto" }}>
            <Label fontSize={20}>Visão geral dos objetos de arte</Label>
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <MetricCard
                  title={`Custo total do mês -  ${
                    months[new Date().getMonth()]
                  }`}
                  value={getActualMonthTotalCost()}
                  percentage={
                    getLastMonthTotalCost()
                      ? ((getActualMonthTotalCost() - getLastMonthTotalCost()) /
                          getLastMonthTotalCost()) *
                        100
                      : 0
                  }
                  Icon={<MdSavings size={24} />}
                  iconBgColor={theme.colors.primary}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <MetricCard
                  title={`Custo total do ano -  ${new Date().getFullYear()}`}
                  value={getActualYearTotalCost()}
                  // difference={
                  //   getLastYearTotalCost()
                  //     ? getLastYearTotalCost() - getActualYearTotalCost()
                  //     : 0
                  // }
                  percentage={
                    getLastYearTotalCost()
                      ? ((getActualYearTotalCost() - getLastYearTotalCost()) /
                          getLastYearTotalCost()) *
                        100
                      : 0
                  }
                  Icon={<MdSavings size={24} />}
                  iconBgColor={theme.colors.terciary}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <MetricCard
                  title={`QTDE total do mês -  ${
                    months[new Date().getMonth()]
                  }`}
                  value={getActualMonthTotalAmount()}
                  // difference={
                  //   getLastMonthTotalAmount()
                  //     ? getLastMonthTotalAmount() - getActualMonthTotalAmount()
                  //     : 0
                  // }
                  percentage={
                    getLastMonthTotalAmount()
                      ? ((getActualMonthTotalAmount() -
                          getLastMonthTotalAmount()) /
                          getLastMonthTotalAmount()) *
                        100
                      : 0
                  }
                  Icon={<MdMoveToInbox size={24} />}
                  iconBgColor={theme.colors.primary}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <MetricCard
                  title={`QTDE total do ano -  ${new Date().getFullYear()}`}
                  value={getActualYearTotalAmount()}
                  // difference={
                  //   getLastYearTotalAmount()
                  //     ? getLastYearTotalAmount() - getActualYearTotalAmount()
                  //     : 0
                  // }
                  percentage={
                    getLastYearTotalAmount()
                      ? ((getActualYearTotalAmount() -
                          getLastYearTotalAmount()) /
                          getLastYearTotalAmount()) *
                        100
                      : 0
                  }
                  Icon={<MdMoveToInbox size={24} />}
                  iconBgColor={theme.colors.terciary}
                />
              </Grid>
            </Grid>
          </Container>
          <div style={{ marginLeft: 24, marginRight: 6, marginTop: 16, maxHeight: 500 }}>
            <GraphPage />
            {/* <Chart
              title="Custo total por ano dos objetos de arte, separados por tipo"
              // subheader=""

              chartData={chartData}
              chartLabels={chartLabels}
              props={undefined}
            /> */}
          </div>
        </Box>
        //  <ContentContainer>

        //   {models.map((model) => (
        //     <ModelCard
        //       modelsTypes={modelsTypes}
        //       modelsRefs={modelsRefs}
        //       model={model}
        //       editingMode={model.editing}
        //       handleOnInvalidModel={handleOnInvalidModel}
        //       handleOnRemoveModel={handleOnRemoveModel}
        //       handleOnUpdateModel={handleOnUpdateModel}
        //     />
        //   ))}

        // </ContentContainer>
      )}
    </DashboardContainer>
  );
}
