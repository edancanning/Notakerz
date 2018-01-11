import React from "react";
import {
  Stepper,
  Step,
  StepContent,
  StepLabel,
  Typography,
  Button,
  Paper
} from "material-ui";

import "./addNoteStepper.css";

var AddNoteStepper = props => (
  <div className="add-note-stepper-component">
    <Stepper
      activeStep={props.activeStep}
      orientation="vertical"
      className="stepper"
    >
      {props.steps.map((label, index) => {
        return (
          <Step className="step" key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>{props.getStep(index)}</StepContent>
          </Step>
        );
      })}
    </Stepper>
    {props.activeStep === props.steps.length && (
      <Paper square elevation={0}>
        <Typography>All steps completed - you&quot;re finished</Typography>
        <Button onClick={props.handleReset}>Reset</Button>
      </Paper>
    )}
  </div>
);

export default AddNoteStepper;
