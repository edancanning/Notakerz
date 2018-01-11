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
  IconButton
} from "material-ui";
import axios from "axios";
import { Close } from "mdi-material-ui";

import AddNoteStepper from "../../components/add-note-stepper/AddNoteStepper";
import "./addNoteModal.css";
class AddNoteModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      activeStep: 0,
      university: "University of Florida",
      course: "",
      courses: []
    };
  }

  componentDidMount = () => {
    axios
      .get("/courses")
      .then(res => {
        console.log(res.body);
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleSelectionChange = event => {
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
          <FormControl className="form-control">
            <InputLabel htmlFor="university">University</InputLabel>
            <Select
              value={this.state.university}
              onChange={this.handleSelectionChange}
              input={<Input name="university" id="university" />}
            >
              <MenuItem value="University of Florida">
                <em>University of Florida</em>
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className="form-control">
            <InputLabel htmlFor="course">Course</InputLabel>
            <Select
              value={this.state.course}
              onChange={this.handleSelectionChange}
              input={<Input name="course" id="course" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.courses.map((course, index) => {
                return (
                  <MenuItem key={course._id} value={10}>
                    Ten
                  </MenuItem>
                );
              })}
            </Select>
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
