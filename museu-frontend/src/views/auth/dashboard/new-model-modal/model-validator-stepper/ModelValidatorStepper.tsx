import { useState, useEffect } from "react";

import {
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Autocomplete,
  Typography,
  TextField,
  Tooltip,
  Select,
  MenuItem,
  CardHeader,
  Avatar,
  StepIconProps,
} from "@mui/material";
import Loading from "../../../../../components/loading/Loading";

type ModelValidatorStepperProps = {
  loading: boolean;
};

const steps = ["Validação função predict", "Validação função list_variables"];

export default function ModelValidatorStepper(
  loading: ModelValidatorStepperProps
) {
  const [activeStep, setActiveStep] = useState(2);
  const [completed, setCompleted] = useState({} as any);

  return (
    <Stepper orientation="vertical" activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label} completed={completed[index]}>
          <StepLabel
            StepIconComponent={(props: StepIconProps) => (
              <Loading 
              loadingSize={20}
              />
            )}
            sx={{ maxWidth: 150 }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
