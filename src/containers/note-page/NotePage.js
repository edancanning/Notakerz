import React from "react";
import axios from "axios";
import { courseToTitle } from "../../utils/utils";

import "./notePage.css";

class NotePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      courseName: "",
      createdAt: "",
      description: "",
      files: [],
      notakerHandle: "",
      price: "",
      title: ""
    };
  }

  componentDidMount() {
    console.log(`GET ${this.props.location.pathname}`);
    axios
      .get("/notes/1")
      .then(res => {
        console.log(res.data.note);
        var {
          course,
          createdAt,
          description,
          files,
          notakerHandle,
          price,
          title
        } = res.data.note;
        this.setState({
          courseName: courseToTitle(
            course.code,
            course.semester,
            course.year,
            course.professor
          ),
          createdAt,
          description,
          files,
          notakerHandle,
          price,
          title
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="note-page-container">
        <div className="header">
          <h1>{this.state.title}</h1>
          <h2>{this.state.courseName}</h2>
        </div>
        <div className="description-container" />
        <div className="files" />
      </div>
    );
  }
}

export default NotePage;
