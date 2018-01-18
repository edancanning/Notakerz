import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton
} from "material-ui";
import axios from "axios";
import { Close } from "mdi-material-ui";

import AddNoteStepper from "../../components/add-note-stepper/AddNoteStepper";
import "./addNoteModal.css";

const TITLE_MAX_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 250;
const TITLE_MIN_LENGTH = 10;
const DESCRIPTION_MIN_LENGTH = 50;
const FILES_MAX_NUMBER = 6;
const FILES_MAX_SIZE = 20; // MB
const BYTE_TO_MEGABYTE = 1024 * 1024;
const SNACKBAR_DURATION = 6000;
const ALLOWED_FILE_TYPE = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/msword"
];
const ALLOWED_FILE_TYPE_PRINT = [".doc", ".docx", ".pdf"];

class AddNoteModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      steps: [
        "Note information",
        "For each ad campaign ",
        "For each ad campaign "
      ],
      activeStep: 0,
      loading: false,
      university: "",
      course: "",
      title: "",
      description: "",
      price: "",
      universityError: false,
      courseError: false,
      titleError: false,
      descriptionError: false,
      priceError: false,
      maxFilesSnackbar: false,
      maxFilesSizeSnackbar: false,
      chooseThumbnailSnackbar: false,
      illegalFileTypeSnackbar: false,
      courses: [],
      universities: [],
      files: []
    };
  }

  componentDidMount = () => {
    axios
      .get("/courses")
      .then(res => {
        console.log("GET /courses");
        this.setState({ courses: res.data.courses });
      })
      .catch(e => {
        console.log(e);
      });

    axios
      .get("/universities")
      .then(res => {
        console.log("GET /universities");
        this.setState({ universities: res.data.universities });
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "Error"]: false
    });
  };

  handlePriceChange = event => {
    var value = event.target.value;
    if (!isNaN(value) && value.length <= 4) {
      if (value.length === 2) {
        if (value[1] === ".") {
          value = value[0];
        } else {
          value = value[0] + "." + value[1];
        }
      }
      this.setState({
        price: value,
        priceError: false
      });
    }
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value.substr(0, DESCRIPTION_MAX_LENGTH),
      descriptionError: false
    });
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value.substr(0, TITLE_MAX_LENGTH),
      titleError: false
    });
  };

  stepOneNext = () => {
    var verified = true;

    if (this.state.university === "") {
      verified = false;
      this.setState({ universityError: true });
    }

    if (this.state.course === "") {
      verified = false;
      this.setState({ courseError: true });
    }

    if (this.state.title === "" || this.state.title.length < TITLE_MIN_LENGTH) {
      verified = false;
      this.setState({ titleError: true });
    }

    if (
      this.state.description === "" ||
      this.state.description.length < DESCRIPTION_MIN_LENGTH
    ) {
      verified = false;
      this.setState({ descriptionError: true });
    }

    if (this.state.price === "") {
      verified = false;
      this.setState({ priceError: true });
    }

    if (verified) {
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    }
  };

  stepTwoNext = () => {
    var verified = true;

    // check that at least one file is highlighted as thumbnail
    var highlighted = this.state.files.find(file => {
      return file.highlight;
    });

    if (!highlighted) {
      this.setState({ chooseThumbnailSnackbar: true });
      verified = false;
    }

    if (verified) {
      this.setState({
        activeStep: this.state.activeStep + 1
      });
    }
  };

  stepThreeNext = () => {
    // TODO handle any errors
    // TODO pass in user jwt
    console.log("PUBLISH");
    var note = {
      university: this.state.university,
      course: this.state.course,
      title: this.state.title,
      description: this.state.description,
      price: parseFloat(this.state.price),
      files: this.state.files,
      notaker: {
        _id: "5a4fab9dd41bff1e5c161e85",
        handle: "edancanning",
        __v: 0
      }
    };
    console.log("New note", note);
    axios
      .post("/note", { note })
      .then(res => {
        console.log(res.data.notes);
        this.setState({
          activeStep: this.state.activeStep + 1
        });
        this.props.updateNotes(res.data.notes);
      })
      .catch(e => console.log(e));
  };

  checkFiles = files => {
    if (files.length > FILES_MAX_NUMBER) {
      this.setState({
        maxFilesSnackbar: true
      });
      return false;
    }

    // check that sums doesn't exceed some value
    var sizeSum = 0;
    for (var i = 0; i < files.length; i++) {
      sizeSum += files[i].size;
    }

    if (sizeSum > FILES_MAX_SIZE * BYTE_TO_MEGABYTE) {
      this.setState({
        maxFilesSizeSnackbar: true
      });
      return false;
    }

    for (let file of files) {
      var allowedType = ALLOWED_FILE_TYPE.find(
        fileType => file.type === fileType
      );
      if (!allowedType) {
        this.setState({
          illegalFileTypeSnackbar: true
        });
        return false;
      }
    }

    // TODO: Check that files are in correct format

    return true;
  };

  handleFileUpload = event => {
    var files = event.target.files;
    console.log(files);
    if (this.checkFiles(files)) {
      this.setState({
        loading: true
      });
      var uploaders = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        uploaders.push(axios.post("/drafts", formData));
      }

      Promise.all(uploaders)
        .then(files => {
          this.setState({
            files: files.map(file => file.data.file),
            loading: false
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  // clear the selected files
  handleFileClear = () => {
    this.setState({
      files: []
    });
  };

  snackBarHandler = (name, bool) => {
    this.setState({
      [name]: bool
    });
  };

  thumbnailClickHandler = name => {
    var newFile;
    this.setState({
      files: this.state.files.map(file => {
        if (file.name === name) {
          newFile = Object.assign({ highlight: true }, file);
          return newFile;
        } else if (file.highlight) {
          newFile = Object.assign({}, file);
          delete newFile.highlight;
          return newFile;
        }
        return file;
      })
    });
  };

  //

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
  //

  render() {
    var fullScreen = false;
    return (
      <div className="add-note-modal-container">
        <Dialog
          className="add-note-modal-dialog"
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.props.handleModalClose}
          aria-labelledby="responsive-dialog-title"
        >
          <AppBar className="app-bar">
            <Toolbar>
              <IconButton
                color="contrast"
                onClick={this.props.handleModalClose}
                aria-label="Close"
              >
                <Close />
              </IconButton>
              <p className="title">Let's create a new note!</p>
            </Toolbar>
          </AppBar>
          <DialogTitle id="responsive-dialog-title">
            {"Let's create a new note!"}
          </DialogTitle>
          <DialogContent className="dialog-content">
            <AddNoteStepper
              steps={this.state.steps}
              SNACKBAR_DURATION={SNACKBAR_DURATION}
              ALLOWED_FILE_TYPE_PRINT={ALLOWED_FILE_TYPE_PRINT}
              getStep={this.getStep}
              handleReset={this.handleReset}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              activeStep={this.state.activeStep}
              universityError={this.state.universityError}
              university={this.state.university}
              universities={this.state.universities}
              courseError={this.state.courseError}
              course={this.state.course}
              courses={this.state.courses}
              titleError={this.state.titleError}
              title={this.state.title}
              descriptionError={this.state.descriptionError}
              description={this.state.description}
              priceError={this.state.priceError}
              price={this.state.price}
              handleInputChange={this.handleInputChange}
              handleTitleChange={this.handleTitleChange}
              handleDescriptionChange={this.handleDescriptionChange}
              handlePriceChange={this.handlePriceChange}
              stepOneNext={this.stepOneNext}
              TITLE_MIN_LENGTH={TITLE_MIN_LENGTH}
              DESCRIPTION_MIN_LENGTH={DESCRIPTION_MIN_LENGTH}
              loading={this.state.loading}
              maxFilesSnackbar={this.state.maxFilesSnackbar}
              maxFilesSizeSnackbar={this.state.maxFilesSizeSnackbar}
              handleFileUpload={this.handleFileUpload}
              FILES_MAX_NUMBER={FILES_MAX_NUMBER}
              FILES_MAX_SIZE={FILES_MAX_SIZE}
              snackBarHandler={this.snackBarHandler}
              thumbnailClickHandler={this.thumbnailClickHandler}
              files={this.state.files}
              stepTwoNext={this.stepTwoNext}
              stepThreeNext={this.stepThreeNext}
              chooseThumbnailSnackbar={this.state.chooseThumbnailSnackbar}
              illegalFileTypeSnackbar={this.state.illegalFileTypeSnackbar}
              handleFileClear={this.handleFileClear}
            />
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button onClick={this.props.handleModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddNoteModal;
