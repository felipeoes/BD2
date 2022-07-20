/* eslint-disable react-hooks/exhaustive-deps */
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import Input from "../../../../components/input/Input";
import { TestingCardContainer } from "./styles";

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export default function TestingCard({ variable, getUpdatedVariable }) {
  const [variableValue, setVariableValue] = useState({
    name: variable.name,
    value: choose([1, -1]),
  });

  const theme = useTheme();

  useEffect(() => {
    getUpdatedVariable(variableValue);
  }, [variableValue]);

  return (
    // <TestingCardContainer>
    //   <TextField
    //   // label={variable}
    //   key={index}
    //   value={random()}
    //   freeSolo
    //   sx={{
    //     mr: { xs: 2, sm: 2 },
    //     marginTop: 2,
    //     width: 160,
    //   }}
    //   onChange={(e) => {
    //     setTestingVariables(
    //       testingVariables.map((v, i) =>
    //         i === index ? { ...v, value: e.target.value } : v
    //       )
    //     );
    //   }}
    // />

    <Input
      type="text"
      name={variable.name}
      borderColor={theme.colors.disabledButton}
      bgColor="transparent"
      placeholder="Digite o valor da variável"
      color={theme.colors.semiblack}
      label={variable.name}
      labelColor={theme.colors.black}
      //   value={variableValue.value}
      value={variableValue.value}
      required
      lblTop={8}
      width={220}
      marginTop={8}
      onChange={(e) => {
        setVariableValue({ ...variable, value: e.target.value });
        getUpdatedVariable(variableValue);
      }}
      marginRight={36}
      // error={errors.email}
      // disabled={disabledForm}
    />
    // </TestingCardContainer>
  );
}
