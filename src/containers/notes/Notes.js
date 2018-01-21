import React from "react";
import { Grid, CircularProgress, Button } from "material-ui/";
import { LeadPencil } from "mdi-material-ui";
import axios from "axios";
import AddNoteModal from "../add-note-modal/AddNoteModal";
import Note from "../../components/note/Note";
import "./notes.css";
class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      modalOpen: false
    };
  }

  componentDidMount() {
    axios
      .get("/notes")
      .then(res => {
        console.log("GET /notes");
        console.log(res.data.notes);
        console.log(typeof res.data.notes);
        this.setState({ notes: res.data.notes });
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderNotes = () => {
    if (this.state.notes.length > 0) {
      return this.state.notes.map(element => (
        <Grid key={element._id} item xs={12} sm={6} lg={4}>
          <Note {...element} />
        </Grid>
      ));
    } else {
      return (
        <Grid item className="loader-container" xs={12}>
          <CircularProgress className="loader" size={75} />
        </Grid>
      );
    }
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  updateNotes = notes => {
    console.log("Update notes", notes);
    this.setState({ notes });
  };

  render() {
    return (
      <div className="notes-container">
        <div className="header">
          <div className="title">
            <h1>University of Florida</h1>
            <h2>Latest notes</h2>
          </div>
          <Button
            className="add-note"
            onClick={this.handleModalOpen}
            fab
            aria-label="create a note"
          >
            <LeadPencil />
          </Button>
        </div>
        <Grid container className="grid-container" spacing={24}>
          {this.renderNotes()}
        </Grid>
        <AddNoteModal
          open={this.state.modalOpen}
          handleModalClose={this.handleModalClose}
          updateNotes={this.updateNotes}
        />
      </div>
    );
  }
}

export default Notes;
