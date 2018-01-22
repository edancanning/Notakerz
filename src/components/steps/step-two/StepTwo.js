import React from "react";
import { Button, CircularProgress, Snackbar, Slide, Grid } from "material-ui";
import { CloudUpload } from "mdi-material-ui";

import ThumbnailCard from "../../thumbnail-card/ThumbnailCard";

import "./stepTwo.css";

function printAllowedFileTypes(fileTypes) {
  var printedFileTypes = "";
  for (let i = 0; i < fileTypes.length - 2; i++) {
    printedFileTypes += fileTypes[i] + ", ";
  }
  printedFileTypes += fileTypes[fileTypes.length - 2] + " ";
  printedFileTypes += "or " + fileTypes[fileTypes.length - 1];
  return printedFileTypes;
}

var StepTwo = props => {
  var fileUploadInput; // will contain ref to hidden file upload button
  return (
    <div className="step-two-component">
      {props.files.length > 0 ? (
        <div>
          <p className="please-select">
            Please select one file to be the thumbnail of your note{" "}
            <span>*</span>
          </p>
          <Grid className="file-thumbnail-cards" container spacing={24}>
            {props.files.map(file => (
              <Grid key={file.name} item xs={12} sm={6} lg={4}>
                <ThumbnailCard
                  {...file}
                  height="10"
                  iconWidth="1.3"
                  fontSize="0.8"
                  footerPadding="0.25"
                  thumbnailClickHandler={props.thumbnailClickHandler}
                />
              </Grid>
            ))}
          </Grid>
          <div className="step-buttons-container">
            <Button className="clear-button" onClick={props.handleFileClear}>
              Clear
            </Button>
            <div className="step-buttons">
              <Button onClick={props.handleBack}>Back</Button>
              <Button
                className="next-button"
                raised
                color="accent"
                onClick={props.stepTwoNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="upload-button-container">
          <p className="title">Let's upload some files!</p>
          <p className="file-types">
            {printAllowedFileTypes(props.ALLOWED_FILE_TYPE_PRINT)}
          </p>
          <div className="loader-container">
            <Button
              fab
              color="accent"
              onClick={() => {
                if (!props.loadingFileUpload) {
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
            {props.loadingFileUpload && (
              <CircularProgress className="loader" size={68} />
            )}
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={props.SNACKBAR_DURATION}
        open={props.chooseThumbnailSnackbar}
        transition={props => <Slide direction="up" {...props} />}
        onClose={() => {
          props.snackBarHandler("chooseThumbnailSnackbar", false);
        }}
        message={"Please select a thumbnail before continuing"}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        autoHideDuration={props.SNACKBAR_DURATION}
        open={props.illegalFileTypeSnackbar}
        transition={props => <Slide direction="up" {...props} />}
        onClose={() => {
          props.snackBarHandler("illegalFileTypeSnackbar", false);
        }}
        message={"Illegal file type"}
      />
    </div>
  );
};

export default StepTwo;
