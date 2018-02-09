import React from "react";
import axios from "axios";
import { CircularProgress, Paper } from "material-ui";
import { Cart } from "mdi-material-ui";
import UserAvatar from "../../components/user-avatar/UserAvatar";
import NoteThumbnail from "../../components/note-thumbnail/NoteThumbnail";
import NoteThumbnailModal from "../../components/note-thumbnail/note-thumbnail-modal/NoteThumbnailModal";
import PageHeader from "../../components/page-header/PageHeader";
import MyGrid from "../../components/my-grid/MyGrid";
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
      files: [],
      thumbnailModalOpen: false,
      thumbnailFileName: "",
      thumbnailFilePages: 0,
      thumbnailFileType: ""
    };
  }

  componentWillMount() {
    console.log(`GET ${this.props.location.pathname}`);
    axios
      .get(this.props.location.pathname)
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

  thumbnailModalHandleOpen = (fileName, pages, fileType) => {
    console.log(pages);
    this.setState({
      thumbnailModalOpen: true,
      thumbnailFileName: fileName,
      thumbnailFilePages: pages,
      thumbnailFileType: fileType
    });
  };

  thumbnailModalHandleClose = () => {
    this.setState({
      thumbnailModalOpen: false
    });
  };

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
          <PageHeader
            title={this.state.title}
            subTitle={this.state.courseName}
            onClick={this.handleModalOpen}
            icon={Cart}
          />
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
            <NoteThumbnailModal
              open={this.state.thumbnailModalOpen}
              handleOpen={this.thumbnailModalHandleOpen}
              handleClose={this.thumbnailModalHandleClose}
              title={this.state.thumbnailFileName}
              fileType={this.state.thumbnailFileType}
              pages={this.state.thumbnailFilePages}
            />
            <MyGrid
              elements={this.state.files}
              elementKey="name"
              component={NoteThumbnail}
              componentProps={{
                height: "18",
                iconWidth: "1.5",
                fontSize: "0.9",
                footerPadding: "0.6",
                thumbnailClickHandler: () => {},
                onClick: this.thumbnailModalHandleOpen
              }}
            />
          </div>
        </div>
      );
    }
  }
}

export default NotePage;
