import React from "react";
import { Button, CircularProgress, Snackbar, Slide } from "material-ui";
import { CloudUpload } from "mdi-material-ui";

import "./stepTwo.css";

var StepTwo = props => {
  var fileUploadInput; // will contain ref to hidden file upload button
  return (
    <div className="step-two-component">
      {props.files.length > 0 ? (
        <div className="file-thumbnail-cards">
          yo
          <div className="step-buttons">
            <Button onClick={props.handleBack}>Back</Button>
            <Button
              className="next-button"
              raised
              color="primary"
              onClick={props.handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="upload-button-container">
          <p className="title">Let's upload some files!</p>
          <div className="loader-container">
            <Button
              fab
              color="accent"
              onClick={() => {
                if (!props.loading) {
                  fileUploadInput.click();
                }
              }}
            >
              <input
                ref={input => {
                  fileUploadInput = input;
                }}
                onChange={props.handleFileUpload}
                style={{ visibility: "hidden", position: "absolute" }}
                type="file"
                multiple
              />
              <CloudUpload />
            </Button>
            {props.loading && <CircularProgress className="loader" size={68} />}
          </div>
        </div>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={props.SNACKBAR_DURATION}
        open={props.maxFilesSnackbar}
        transition={props => <Slide direction="up" {...props} />}
        onClose={() => {
          props.snackBarHandler("maxFilesSnackbar", false);
        }}
        message={`Maximum ${props.FILES_MAX_NUMBER} files per note`}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={props.SNACKBAR_DURATION}
        open={props.maxFilesSizeSnackbar}
        transition={props => <Slide direction="up" {...props} />}
        onClose={() => {
          props.snackBarHandler("maxFilesSizeSnackbar", false);
        }}
        message={`Maximum total of ${props.FILES_MAX_SIZE}MB per note`}
      />
    </div>
  );
};

export default StepTwo;
