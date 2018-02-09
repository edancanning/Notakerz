import React from "react";
import { LeadPencil } from "mdi-material-ui";
import PageHeader from "../../components/page-header/PageHeader";
import Loader from "../../components/loader/Loader";

import { courseToTitle } from "../../utils/utils";
import axios from "axios";

import "./coursePage.css";

class CoursePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false,
      course: {}
    };
  }

  componentWillMount = () => {
    console.log("GET " + this.props.location.pathname);
    axios
      .get(this.props.location.pathname)
      .then(res => {
        console.log(res.data.course);
        this.setState({
          course: res.data.course,
          loaded: true
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    if (this.state.loaded) {
      return (
        <div className="course-page-container">
          <PageHeader
            title="University of Florida"
            subTitle={courseToTitle(
              this.state.course.code,
              this.state.course.semester,
              this.state.course.year,
              this.state.course.professor
            )}
            icon={LeadPencil}
          />
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

export default CoursePage;
