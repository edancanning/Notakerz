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

var steps = [
  "Note information",
  "For each ad campaign ",
  "For each ad campaign "
];

var AddNoteStepper = props => (
  <div className="add-note-stepper-component">
    <Stepper
      activeStep={props.activeStep}
      orientation="vertical"
      className="stepper"
    >
      {steps.map((label, index) => {
        return (
          <Step className="step" key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {props.getStep(index)}
              <div className="step-buttons">
                <Button
                  disabled={props.activeStep === 0}
                  onClick={props.handleBack}
                >
                  Back
                </Button>
                <Button
                  className="next-button"
                  raised
                  color="primary"
                  onClick={props.handleNext}
                >
                  {props.activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
    {props.activeStep === steps.length && (
      <Paper square elevation={0}>
        <Typography>All steps completed - you&quot;re finished</Typography>
        <Button onClick={props.handleReset}>Reset</Button>
      </Paper>
    )}
  </div>
);

export default AddNoteStepper;
