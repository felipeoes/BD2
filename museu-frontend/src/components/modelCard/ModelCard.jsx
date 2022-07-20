import React from "react";
import { useContext, useState, Fragment } from "react";
import { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

import { BsThreeDots } from "react-icons/bs";
import { MdFilePresent } from "react-icons/md";
import { CardLogo, CardLogoContainer, ModelVariablesContainer } from "./styles";
import Button from "../button/Button";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import AuthContext from "../../contexts/auth";

import logoBV from "../../assets/images/logos/bv-logo.svg";
import AppBar from "../appBar/AppBar";
import ServicesModal from "../modal/Modal";
import UploadModal from "../../views/auth/dashboard/new-model-modal/NewModelModal";
import { Label } from "../input/styles";

function formataData(data) {
  // de acordo com o padrão pt-br
  let dateParts = data.split("/");
  const day = dateParts[0];
  const month = dateParts[1];
  dateParts[0] = month;
  dateParts[1] = day;

  const newDate = dateParts.join("/");
  const data_obj = new Date(newDate);

  const dataFormatada = `${data_obj.toLocaleDateString(
    "pt-BR"
  )} ${data_obj.toLocaleTimeString("pt-BR")}`;
  return dataFormatada;
}

export default function ModelCard({
  model,
  modelsTypes,
  modelsRefs,
  handleOnAddNewModel,
  handleOnRemoveModel,
  handleOnUpdateModel,
  disableEditing,
}) {
  const [textExpanded, setTextExpanded] = useState(false);
  const [modelVariables, setModelVariables] = useState(model.variaveis);
  const [loading, setLoading] = useState(false);
  const [editModelModal, setEditModelModal] = useState(null);

  let navigate = useNavigate();

  const CARD_WIDTH = 425;
  const CARD_HEIGHT = 300;
  // arquivo de imagem do logo da empresa desenvolvedora do modelo

  const theme = useTheme();
  const { user } = useContext(AuthContext);

  function handleOnClickText() {
    setTextExpanded(!textExpanded);
  }

  function handleOnClickEdit() {
    console.log("edit");
    if (
      typeof model.modelo_ref === "string" ||
      model.modelo_ref instanceof String
    ) {
      model.modelo_ref = modelsRefs.findIndex(
        (ref) => ref === model.modelo_ref
      );
    }
    editModelModal();
  }

  function handleOnClickDownload() {
    if (model?.arquivo_pickle) {
      // recupera o arquivo do modelo e baixa
      fetch(model.arquivo_pickle).then((response) => {
        response.blob().then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${model.nome}.pkl`;
          link.click();
        });
      });
    }
  }
  function handleOnClickRemove() {
    handleOnRemoveModel(model);
  }

  function handleOnClickTestModel() {
    navigate(`/testagem/${model.id}`);
  }

  function getFile() {
    var arq =
      model?.arquivo_pickle?.path || model?.arquivo_pickle?.split("/")[5];
    let parts = arq.split("_"); // Retirando o hash do nome do arquivo
    parts.pop();
    arq = parts.join("_") + ".pkl";
    return arq;
  }

  const items = [
    {
      id: "edit",
      name: "Editar",
      onClickItem: handleOnClickEdit,
    },
    {
      id: "remove",
      name: "Remover",
      onClickItem: handleOnClickRemove,
    },
    {
      id: "download",
      name: "Baixar arquivo",
      onClickItem: handleOnClickDownload,
    },
  ];

  if (disableEditing) {
    items.splice(0, 1);
  }

  return (
    <Fragment>
      <ServicesModal
        headless
        height={600}
        ModalContent={UploadModal}
        modalProps={{
          editing: true,
          model,
          modelsTypes,
          modelsRefs,
          handleOnAddNewModel,
          handleOnUpdateModel,
        }}
        setModalFunction={(f) => {
          setEditModelModal(f);
        }}
      />

      {model && (
        <Card
          sx={{
            width: CARD_WIDTH,
            margin: 2,
            height: CARD_HEIGHT,
            maxHeight: CARD_HEIGHT,
            overflow: "auto",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: theme.colors.primaryLight,
                  height: 60,
                  width: 60,
                }}
                aria-label="recipe"
              >
                <CardLogoContainer>
                  <CardLogo
                    src={model.logo_empresa || logoBV}
                    alt="Logo da empresa desenvolvedora do modelo"
                  />
                </CardLogoContainer>
              </Avatar>
            }
            action={
              !disableEditing && (
                <DropdownMenu Icon={<BsThreeDots size={26} />} items={items} />
              )
            }
            title={
              <div>
                <Label>Nome do modelo</Label>
                <p
                  style={{
                    fontFamily: "InterSemiBold",
                    fontSize: 16,
                    color: theme.colors.black80,
                    marginTop: 0,
                    marginBottom: 8,
                  }}
                >
                  {model.nome}
                </p>
              </div>
            }
            subheader={
              <div>
                <Label>Tipo de técnica</Label>
                <p
                  style={{
                    fontFamily: "InterSemiBold",
                    fontSize: 16,
                    color: theme.colors.black80,
                    marginTop: 0,
                    marginBottom: 2,
                  }}
                >
                  {modelsTypes[model.tipo]}
                </p>
                {!disableEditing &&
                  `Atualizado em ${formataData(model.atualizado_em)}`}
              </div>
            }
          />
          <CardMedia
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {getFile() && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MdFilePresent size={38} color={theme.colors.black80} />

                <span style={{ fontFamily: "InterSemiBold" }}>{getFile()}</span>
              </div>
            )}
          </CardMedia>
          <CardContent
            sx={{
              overflow: "hidden",
              paddingBottom: 0,
              marginBottom: 1,
            }}
          >
            <Label>Descrição</Label>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                // minHeight: 60,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: !textExpanded && 3,
                textOverflow: "ellipsis",
              }}
              onClick={handleOnClickText}
            >
              {model.descricao}
            </Typography>
          </CardContent>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 1,
            }}
          >
            <Typography
              paragraph
              style={{ display: "flex", fontFamily: "InterBold" }}
            >
              {modelVariables.length} variáveis
            </Typography>

            {!disableEditing && (
              <ModelVariablesContainer>
                {modelVariables.map((variable, index) => (
                  <Typography
                    key={index}
                    style={{
                      fontFamily: "InterMedium",
                      fontSize: 16,
                      color: theme.colors.black80,
                      marginTop: 1,
                      marginBottom: 2,
                      marginRight: 4,
                    }}
                  >
                    {variable}
                  </Typography>
                ))}
              </ModelVariablesContainer>
            )}
          </CardContent>
          {!disableEditing && (
            <AppBar bottom>
              <div style={{ display: "flex", width: "100%" }}>
                <Button
                  height={36}
                  bgColor={theme.colors.primary}
                  onClick={handleOnClickTestModel}
                >
                  Testar modelo
                </Button>
              </div>
            </AppBar>
          )}
        </Card>
      )}
    </Fragment>
  );
}
