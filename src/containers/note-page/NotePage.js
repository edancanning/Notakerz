import React from "react";
import axios from "axios";
import { CircularProgress, Button, Paper, Grid } from "material-ui";
import { Cart } from "mdi-material-ui";
import UserAvatar from "../../components/user-avatar/UserAvatar";
import NoteThumbnail from "../../components/note-thumbnail/NoteThumbnail";
import { courseToTitle } from "../../utils/utils";

import "./notePage.css";

class NotePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
      courseName: "",
      createdAt: "",
      description: "",
      notakerHandle: "",
      price: "",
      title: "",
      files: []
    };
  }

  componentWillMount() {
    console.log(`GET ${this.props.location.pathname}`);
    axios
      .get("/notes/1")
      .then(res => {
        console.log(res.data.note);
        var note = res.data.note;
        this.setState({
          courseName: courseToTitle(
            note.course.code,
            note.course.semester,
            note.course.year,
            note.course.professor
          ),
          createdAt: note.createdAt,
          description: note.description,
          files: note.files,
          notakerHandle: note.notaker.handle,
          price: note.price,
          title: note.title,
          loaded: true
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    // check if files are loaded (should all load at the same time anyway so it doesn't matter)
    if (!this.state.loaded) {
      // render spinner if not
      return (
        <div className="note-page-container">
          <CircularProgress className="loader" size={75} />
        </div>
      );
    } else {
      return (
        <div className="note-page-container">
          <div className="header">
            <div className="title">
              <h1>{this.state.title}</h1>
              <h2>{this.state.courseName}</h2>
            </div>
            <Button
              className="action-button"
              onClick={this.handleModalOpen}
              fab
              aria-label="create a note"
              color="accent"
            >
              <Cart />
            </Button>
          </div>
          <h3>Description</h3>
          <Paper className="description-container">
            <UserAvatar
              notakerHandle={this.state.notakerHandle}
              createdAt={this.state.createdAt}
              price={this.state.price}
            />
            <div className="description">
              <p>{this.state.description}</p>
            </div>
          </Paper>
          <div className="files">
            <h3>Files</h3>
            <Grid className="file-thumbnail-cards" container spacing={24}>
              {this.state.files.map(file => (
                <Grid key={file.name} item xs={12} sm={6} lg={4}>
                  <NoteThumbnail
                    {...file}
                    height="18"
                    iconWidth="1.5"
                    fontSize="0.9"
                    footerPadding="0.6"
                    thumbnailClickHandler={() => {}}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      );
    }
  }
}

export default NotePage;
