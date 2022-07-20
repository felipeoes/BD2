import DynamicTable from "../../../../components/dynamicTable/DynamicTable";
import TestingCard from "../testing-card/TestingCard";
import { TabContentContainer } from "./styles";

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

export default function TabVars({ variables, setTestingVariables }) {
  return (
    <TabContentContainer>
      {/* <DynamicTable
        rowsPerPage={10}
        maxHeight={300}
        platform="testes"
        buttonLoading={false}
        columns={variables.map((variable) => variable.name)}
        rows={variables.map((variable) => variable.value)}
      /> */}
      {variables &&
        variables.map(
          (variable, index) => (
            (variable.value = choose([-1, 1])),
            (
              <TestingCard
                key={index}
                variable={variable}
                index={index}
                getUpdatedVariable={(newVariable) => {
                  variable[index] = newVariable;
                  // const newVariables = [...testingVariables];
                  // newVariables[index] = newVariable;
                  setTestingVariables(variables);
                }}
              />
            )
          )
        )}
    </TabContentContainer>
  );
}
