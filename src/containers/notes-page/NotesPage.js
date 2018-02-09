import React from "react";
import { LeadPencil } from "mdi-material-ui";
import axios from "axios";
import AddNoteModal from "../add-note-modal/AddNoteModal";
import Note from "../../components/note/Note";
import PageHeader from "../../components/page-header/PageHeader";
import MyGrid from "../../components/my-grid/MyGrid";
import "./notesPage.css";
class NotesPage extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      modalOpen: false
    };
  }

  componentWillMount() {
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
        <PageHeader
          title={"University of Florida"}
          subTitle={"Latest Notes"}
          onClick={this.handleModalOpen}
        >
          <LeadPencil />
        </PageHeader>

        <MyGrid elements={this.state.notes} elementKey="_id" component={Note} />
        <AddNoteModal
          open={this.state.modalOpen}
          handleModalClose={this.handleModalClose}
          updateNotes={this.updateNotes}
        />
      </div>
    );
  }
}

export default NotesPage;
