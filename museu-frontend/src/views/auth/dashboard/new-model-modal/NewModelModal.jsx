/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, Fragment } from "react";
import { useTheme } from "styled-components";
import { useDropzone } from "react-dropzone";


import AuthContext from "../../../../contexts/auth";
import {
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,
  CardHeader,
  Avatar,
} from "@mui/material";

import {
  MdNavigateNext,
  MdNavigateBefore,
  MdCheckCircleOutline,
  MdFilePresent,
  MdOutlineCameraAlt,
} from "react-icons/md";
import { UploadViewContainer, Container } from "./styles";

import Input from "../../../../components/input/Input";
import Button from "../../../../components/button/Button";
import Loading from "../../../../components/loading/Loading";
import { Label } from "../../../../components/input/styles";
import {
  CardLogoContainer,
  CardLogoInputContainer,
  CardLogoInput,
  CardLogoPreview,
} from "../../../../components/modelCard/styles";

import logoBV from "../../../../assets/images/logos/bv-logo.svg";
import ModelCard from "../../../../components/modelCard/ModelCard";

const steps = [
  "Definições gerais do modelo",
  "Arquivos e especificações",
  "Pré-visualização e confirmação",
];

export default function UploadView(props) {
  const [model, setModel] = useState(
    props.model || {
      nome: "",
      descricao: "",
      tipo: "",
      modelo_ref: "",
      atualizado_em: "",
      logo_empresa: "",
      variaveis: [],
      arquivo_pickle: "",
    }
  );

  const [uploadImages, setUploadImages] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    type: "",
    ref: "",
    arquivo_pickle: "",
  });
  const [disabledForm, setDisabledForm] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState({
    message: "",
    counter: 30,
  });
  const context = useContext(AuthContext);
  const { dispatch, user } = context;
  const theme = useTheme();

  const thumb = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    border: "1px solid #eeeeee",
    marginRight: 8,
    marginLeft: 8,
    width: "100%",
    padding: 4,
    borderStyle: "dashed",
    borderWidth: 2,
  };

  const img = {
    display: "block",
    width: "auto",
    maxHeight: 80,
  };

  const thumbnails = uploadImages.map((file) => (
    <div style={thumb} key={file.name}>
      <div>
        <img
          src={file.preview}
          style={img}
          alt={"preview-thumbnail"}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const {
    acceptedFiles,
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
  } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setUploadImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    onFileDialogOpen: () => setLoading(true),
    onFileDialogCancel: () => setLoading(false),
    onDropAccepted: () => setLoading(false),
    onDropRejected: () => setLoading(false),
  });

  // arquivo do pickle do modelo, se existir
  const {
    getRootProps: getRootPropsPickle,
    getInputProps: getInputPropsPickle,
  } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFilesPickle) => {
      setUploadFiles(
        acceptedFilesPickle.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setModel({ ...model, arquivo_pickle: acceptedFilesPickle[0] });
      // Remove  os erros
      setErrors({ ...errors, arquivo_pickle: "" });
    },
    // onFileDialogOpen: () => setLoading(true),
  });

  function getFile() {
    return model?.arquivo_pickle?.name || uploadFiles[0]?.name.split("/")[5];
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleUncomplete = () => {
    const newCompleted = completed;
    delete newCompleted[activeStep];
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function step1Finished() {
    return Boolean(
      model.nome !== "" && model.descricao !== "" && model.tipo !== ""
    );
  }

  function step2Finished() {
    return Boolean(model.modelo_ref !== "");
  }

  function hasAnyError() {
    return Object.values(errors).filter((error) => error !== "").length > 0;
  }

  function disabledConfirmStep() {
    if (activeStep === 0) {
      return !step1Finished() || (props.editing && !dataChanged());
    }

    if (activeStep === 1) {
      return !step2Finished() || (props.editing && !dataChanged());
    }

    if (activeStep === 2) {
      return (
        !step1Finished() ||
        !step2Finished() ||
        hasAnyError() ||
        (props.editing && !dataChanged())
      );
    }
  }

  useEffect(() => {}, [context]);

  const blobUrlToFile = (blobUrl, fileExtension) =>
    new Promise((resolve) => {
      fetch(blobUrl).then((res) => {
        res.blob().then((blob) => {
          // please change the file.extension with something more meaningful
          // or create a utility function to parse from URL
          const file = new File([blob], `file.${fileExtension}`, {
            type: blob.type,
          });
          resolve(file);
        });
      });
    });

  async function handleFinish() {
    setLoading(true);

    const formData = new FormData();

    formData.append("nome", model.nome);
    formData.append("descricao", model.descricao);
    formData.append("tipo", model.tipo);

    if (model.modelo_ref === 0) {
      formData.append("modelo_ref", model.modelo_ref);
    } else {
      formData.append("modelo_ref", props.modelsRefs[model.modelo_ref]);
    }

    if (uploadImages.length > 0) {
      formData.append("logo_empresa", uploadImages[0], uploadImages[0].name);
    } else if (model?.logo_empresa) {
      var extension = model?.logo_empresa.split(".").at(-1);
      const blobUrl = await blobUrlToFile(model?.logo_empresa, extension);
      formData.append("logo_empresa", blobUrl, blobUrl.name);
    } else {
      const blobUrl = await blobUrlToFile(logoBV, "svg");
      formData.append("logo_empresa", blobUrl, blobUrl.name);
    }

    if (uploadFiles.length > 0) {
      formData.append("arquivo_pickle", uploadFiles[0], uploadFiles[0].name);
    } else if (model?.arquivo_pickle) {
      formData.append("arquivo_pickle", model.arquivo_pickle);
    }

    const response = await context.CreateOrUpdateModel(
      model?.id || null,
      formData
    );

    if (response.id) {
      const model = {
        id: response.id,
        nome: response.nome,
        descricao: response.descricao,
        tipo: response.tipo,
        atualizado_em: response.atualizado_em,
        logo_empresa: response.logo_empresa,
        arquivo_pickle: response?.arquivo_pickle,
        modelo_ref: response?.modelo_ref,
        variaveis: response?.variaveis,
      };

      props.editing
        ? props.handleOnUpdateModel(model)
        : props.handleOnAddNewModel(model);
      setModel(model);
    } else {
      let message = response?.data?.error[0];
      const pendingFunctions = response?.data?.pending_functions;

      if (!message) {
        message = "Erro ao salvar o modelo";
      }

      if (pendingFunctions) {
        message = `${message}\n\n 
        Funções pendentes: 
        \n\n ${pendingFunctions.join("\n")}`;
      }

      setErrors({ arquivo_pickle: message });
      setLoading(false);
    }

    setTimeout(() => {
      if (response.id) {
        props.handleOnClose();
      }

      setLoading(false);
      props.setLoading(false);
    }, 1000);
  }

  function allFieldsFilled() {
    return (
      model.nome !== "" &&
      model.descricao !== "" &&
      model.tipo !== "" &&
      model.modelo_ref !== ""
    );
  }

  function dataChanged() {
    let changed =
      (props.model.nome !== model.nome ||
        props.model.descricao !== model.descricao ||
        props.model.tipo.toString() !== model.tipo.toString() ||
        props.model.modelo_ref !== model.modelo_ref ||
        props.model.logo_empresa !== model.logo_empresa ||
        props.model.arquivo_pickle !== model.arquivo_pickle ||
        uploadImages.length > 0 ||
        uploadFiles.length > 0) &&
      allFieldsFilled();
    changed && handleUncomplete();
    return changed;
  }

  return (
    <Container width={602} height={450}>
      <UploadViewContainer>
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel sx={{ maxWidth: 150 }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {allStepsCompleted() ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <div sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <div sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Typography sx={{ fontFamily: "InterMedium", mt: 3, mb: 2 }}>
                Etapa {activeStep + 1}
              </Typography>

              {activeStep === 0 && (
                <Fragment>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Input
                      borderColor={theme.colors.disabledButton}
                      bgColor="transparent"
                      placeholder="Digite o nome do modelo"
                      autoFocus
                      type="text"
                      name="modelName"
                      color={theme.colors.semiblack}
                      label="Nome"
                      labelColor={theme.colors.black}
                      value={model.nome}
                      required
                      lblTop={8}
                      width={220}
                      marginTop={8}
                      onChange={(e) =>
                        setModel({ ...model, nome: e.target.value })
                      }
                      error={errors.email}
                      disabled={disabledForm}
                    />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Label
                        marginTop={8}
                        labelColor={theme.colors.semiblack}
                        fontSize={14}
                      >
                        Tipo do modelo
                      </Label>
                      <Select
                        value={model.tipo}
                        onChange={(e) =>
                          setModel({ ...model, tipo: e.target.value })
                        }
                        sx={{
                          maxHeight: 36,
                          width: 220,
                          fontFamily: "InterRegular",
                          fontSize: 14,
                        }}
                        style={{
                          marginTop: 8,
                        }}
                      >
                        {props.modelsTypes.map((type, index) => (
                          <MenuItem key={index} value={index}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <Label
                    marginTop={8}
                    labelColor={theme.colors.semiblack}
                    fontSize={14}
                  >
                    Descrição
                  </Label>

                  <TextField
                    sx={{
                      marginTop: 1,
                      fontFamily: "InterRegular",
                      fontSize: 14,
                    }}
                    InputProps={{
                      style: {
                        fontFamily: "InterRegular",
                        fontSize: 14,
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    maxRows={2}
                    minRows={2}
                    fullWidth
                    placeholder="Digite uma descrição para o modelo"
                    value={model.descricao}
                    onChange={(e) =>
                      setModel({ ...model, descricao: e.target.value })
                    }
                  />
                </Fragment>
              )}

              {activeStep === 1 && (
                <Fragment>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: -8,
                            padding: 0,
                            marginLeft: -20,
                          }}
                        >
                          <Label
                            marginTop={0}
                            style={{ marginBottom: 8 }}
                            labelColor={theme.colors.semiblack}
                            fontSize={14}
                          >
                            Logo da empresa
                          </Label>

                          <Avatar
                            sx={{
                              bgcolor: theme.colors.primaryLight,
                              height: 60,
                              width: 60,
                              ml: 3.5,
                            }}
                            aria-label="recipe"
                          >
                            <CardLogoContainer>
                              <div>
                                <CardLogoInputContainer
                                  {...getRootProps1({
                                    className: "dropzone",
                                  })}
                                >
                                  <CardLogoInput {...getInputProps1()} />
                                  {loading ? (
                                    <Loading loadingSize={20} />
                                  ) : (
                                    // <p style={{ fontFamily: "InterMedium" }}>
                                    //   Arraste o arquivo de imagem aqui ou clique para
                                    //   selecioná-lo
                                    // </p>
                                    ""
                                  )}
                                </CardLogoInputContainer>
                                <CardLogoPreview
                                  style={{
                                    marginBottom: 42,
                                  }}
                                >
                                  {thumbnails}
                                </CardLogoPreview>
                              </div>
                            </CardLogoContainer>
                          </Avatar>
                        </div>
                      }
                    />

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Label
                        marginTop={8}
                        labelColor={theme.colors.semiblack}
                        fontSize={14}
                      >
                        Modelo referência (objeto)
                      </Label>
                      <Select
                        value={model.modelo_ref}
                        onChange={(e) =>
                          setModel({ ...model, modelo_ref: e.target.value })
                        }
                        sx={{
                          maxHeight: 36,
                          width: 220,
                          fontFamily: "InterRegular",
                          fontSize: 14,
                        }}
                        style={{
                          marginTop: 8,
                        }}
                      >
                        <MenuItem value={0}>Nenhum - Modelo novo</MenuItem>
                        {props.modelsRefs.map((ref, index) => (
                          <MenuItem key={index} value={index + 1}>
                            {ref}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <Label
                    marginTop={8}
                    labelColor={theme.colors.semiblack}
                    fontSize={14}
                  >
                    Arquivo pickle
                  </Label>

                  <div>
                    <CardLogoInputContainer
                      {...getRootPropsPickle({ className: "dropzone" })}
                    >
                      <CardLogoInput {...getInputPropsPickle()} />
                      {loading ? (
                        <Loading loadingSize={20} />
                      ) : (
                        <p style={{ fontFamily: "InterMedium" }}>
                          Arraste o arquivo pickle aqui ou clique para
                          selecioná-lo
                        </p>
                      )}
                    </CardLogoInputContainer>
                    {getFile() && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MdFilePresent size={38} color={theme.colors.black80} />

                        <span style={{ fontFamily: "InterSemiBold" }}>
                          {getFile()}
                        </span>
                      </div>
                    )}
                  </div>
                </Fragment>
              )}

              {activeStep === 2 &&
                (step1Finished() && step2Finished() ? (
                  <div
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {errors.arquivo_pickle ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h4>
                          Erros encontrados no modelo. Por favor, verifique os
                          itens abaixo:
                        </h4>
                        {Object.keys(errors).map((key) => (
                          <div key={key}>
                            <Label
                              marginTop={8}
                              labelColor={theme.colors.semiblack}
                              fontSize={14}
                            >
                              {errors[key]};
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : loading ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Loading loadingSize={20} />
                        <p>Validando o arquivo pickle...</p>
                      </div>
                    ) : (
                      <ModelCard
                        model={model}
                        modelsTypes={props.modelsTypes}
                        modelsRefs={props.modelsRefs}
                        disableEditing
                      />
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      height: "100%",
                      marginTop: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p>
                      Finalize as etapas anteriores para pré-visualizar o modelo
                    </p>
                  </div>
                ))}

              <div
                style={{
                  display: "flex",
                  width: "37%",
                  // marginTop: 16,
                  marginBottom: 8,
                  bottom: 30,
                  position: "absolute",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // border: "2px red solid",
                }}
              >
                <div style={{ display: "flex" }}>
                  <IconButton
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    <MdNavigateBefore size={30} />
                  </IconButton>
                  <div sx={{ flex: "1 1 auto" }} />
                  <IconButton
                    color="inherit"
                    disabled={activeStep === 2}
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                  >
                    <MdNavigateNext size={30} />
                  </IconButton>
                </div>

                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ display: "inline-block", marginRight: 1 }}
                      >
                        Etapa {activeStep + 1} já foi completada
                      </Typography>
                      <MdCheckCircleOutline
                        size={24}
                        color={theme.colors.primaryLight}
                      />
                    </div>
                  ) : (
                    <Button
                      btnType="loading"
                      loading={loading}
                      bgColor={theme.colors.primary}
                      width={160}
                      onClick={
                        completedSteps() === totalSteps() - 1
                          ? handleFinish
                          : handleComplete
                      }
                      disabled={disabledConfirmStep()}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finalizar"
                        : "Completar etapa"}
                    </Button>
                  ))}
              </div>
            </Fragment>
          )}
        </div>
      </UploadViewContainer>
    </Container>
  );
}
