import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Input,
  Select,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  FormHelperText,
  InputAdornment
} from "material-ui";
import axios from "axios";
import { Close } from "mdi-material-ui";

import AddNoteStepper from "../../components/add-note-stepper/AddNoteStepper";
import { courseToTitle } from "../../utils/utils";
import "./addNoteModal.css";
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
      courses: [],
      universities: []
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

  handleFormNext = () => {
    var verified = true;

    if (this.state.university === "") {
      verified = false;
      this.setState({ universityError: true });
    }

    if (this.state.course === "") {
      verified = false;
      this.setState({ courseError: true });
    }

    if (this.state.title === "") {
      verified = false;
      this.setState({ titleError: true });
    }

    if (this.state.description === "") {
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

  getStep = index => {
    if (index === 0) {
      return (
        <div>
          <form className="form" autoComplete="off">
            <FormControl
              required
              className="input-field"
              error={this.state.universityError}
            >
              <InputLabel htmlFor="university">University</InputLabel>
              <Select
                value={this.state.university}
                onChange={this.handleInputChange}
                input={<Input name="university" id="university" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.universities.map(university => (
                  <MenuItem key={university._id} value={university._id}>
                    {university.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              required
              className="input-field"
              error={this.state.courseError}
            >
              <InputLabel htmlFor="course">Course</InputLabel>
              <Select
                value={this.state.course}
                onChange={this.handleInputChange}
                input={<Input name="course" id="course" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.state.courses.map((course, index) => (
                  <MenuItem key={course._id} value={course._id}>
                    {courseToTitle(
                      course.code,
                      course.semester,
                      course.year,
                      course.professor
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              error={this.state.titleError}
              name="title"
              className="input-field"
              required
              id="course-title"
              label="Course Title"
              value={this.state.title}
              margin="normal"
              helperText="Min 10 characters"
              maxLength="2"
              onChange={this.handleInputChange}
            />
            <TextField
              error={this.state.descriptionError}
              name="description"
              className="input-field"
              required
              id="course-description"
              label="Course Description"
              defaultValue=""
              margin="normal"
              multiline
              maxLength="100"
              onChange={this.handleInputChange}
              helperText="Min 30 characters"
            />
            <FormControl
              required
              className="input-field"
              error={this.state.priceError}
            >
              <InputLabel htmlFor="price">Price</InputLabel>
              <Input
                id="price"
                value={this.state.price}
                onChange={this.handlePriceChange}
                name="price"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
              <FormHelperText>Max $9.99</FormHelperText>
            </FormControl>
          </form>
          <div className="step-buttons">
            <Button disabled onClick={this.handleBack}>
              Back
            </Button>
            <Button
              className="next-button"
              raised
              color="primary"
              onClick={this.handleFormNext}
            >
              Next
            </Button>
          </div>
        </div>
      );
    } else if (index === 1) {
      return (
        <div>
          <div className="step-buttons">
            <Button onClick={this.handleBack}>Back</Button>
            <Button
              className="next-button"
              raised
              color="primary"
              onClick={this.handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      );
    } else if (index === 2) {
      return <div>yo3</div>;
    }
  };

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
              getStep={this.getStep}
              handleReset={this.handleReset}
              handleBack={this.handleBack}
              handleNext={this.handleNext}
              activeStep={this.state.activeStep}
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
