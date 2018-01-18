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
import StepOne from "../steps/step-one/StepOne";
import StepTwo from "../steps/step-two/StepTwo";
import StepThree from "../steps/step-three/StepThree";

import "./addNoteStepper.css";

function getStep(index, props) {
  if (index === 0) {
    return (
      <StepOne
        universityError={props.universityError}
        university={props.university}
        universities={props.universities}
        courseError={props.courseError}
        course={props.course}
        courses={props.courses}
        titleError={props.titleError}
        title={props.title}
        descriptionError={props.descriptionError}
        description={props.description}
        priceError={props.priceError}
        price={props.price}
        handleInputChange={props.handleInputChange}
        handleTitleChange={props.handleTitleChange}
        handleDescriptionChange={props.handleDescriptionChange}
        handlePriceChange={props.handlePriceChange}
        handleBack={props.handleBack}
        stepOneNext={props.stepOneNext}
        TITLE_MIN_LENGTH={props.TITLE_MIN_LENGTH}
        DESCRIPTION_MIN_LENGTH={props.DESCRIPTION_MIN_LENGTH}
      />
    );
  } else if (index === 1) {
    return (
      <StepTwo
        loading={props.loading}
        maxFilesSnackbar={props.maxFilesSnackbar}
        maxFilesSizeSnackbar={props.maxFilesSizeSnackbar}
        handleFileUpload={props.handleFileUpload}
        handleBack={props.handleBack}
        handleNext={props.handleNext}
        SNACKBAR_DURATION={props.SNACKBAR_DURATION}
        FILES_MAX_NUMBER={props.FILES_MAX_NUMBER}
        ALLOWED_FILE_TYPE_PRINT={props.ALLOWED_FILE_TYPE_PRINT}
        FILES_MAX_SIZE={props.FILES_MAX_SIZE}
        snackBarHandler={props.snackBarHandler}
        thumbnailClickHandler={props.thumbnailClickHandler}
        files={props.files}
        stepTwoNext={props.stepTwoNext}
        chooseThumbnailSnackbar={props.chooseThumbnailSnackbar}
        illegalFileTypeSnackbar={props.illegalFileTypeSnackbar}
        handleFileClear={props.handleFileClear}
      />
    );
  } else if (index === 2) {
    return (
      <StepThree
        stepThreeNext={props.stepThreeNext}
        handleNext={props.handleNext}
      />
    );
  }
}

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
            <StepContent>{getStep(index, props)}</StepContent>
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
