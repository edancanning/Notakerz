import React from "react";
import PageHeader from "../../components/page-header/PageHeader";
import { LeadPencil } from "mdi-material-ui";
import axios from "axios";

import "./coursePage.css";

class CoursePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      course: {}
    };
  }

  componentWillMount = () => {
    console.log("GET courses/id");
    axios
      .get(this.props.location.pathname)
      .then(res => {
        this.setState({
          course: res.data.course
        });
        console.log(res.data.course);
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="course-page-container">
        <PageHeader
          title="University of Florida"
          subTitle=""
          icon={LeadPencil}
        />
      </div>
    );
  }
}

export default CoursePage;
