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
      activeStep: 0,
      university: "University of Florida",
      course: "",
      title: "",
      description: "",
      price: "",
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
    this.setState({ [event.target.name]: event.target.value });
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
        <form className="form" autoComplete="off">
          <FormControl className="input-field">
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
          <FormControl className="input-field">
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
            name="title"
            className="input-field"
            required
            id="course-title"
            label="Course Title"
            value={this.state.title}
            margin="normal"
            helperText="Min 10 characters"
            maxLength={20}
            onChange={this.handleInputChange}
          />
          <TextField
            name="description"
            className="input-field"
            required
            id="course-description"
            label="Course Description"
            defaultValue=""
            margin="normal"
            multiline
            maxLength={200}
            onChange={this.handleInputChange}
            helperText="Min 30 characters"
          />
          <FormControl className="input-field">
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              value={this.state.price}
              onChange={this.handleInputChange}
              name="price"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </form>
      );
    } else if (index === 1) {
      return <div>yo2</div>;
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
