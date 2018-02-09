import React from "react";
import { Plus } from "mdi-material-ui";
import axios from "axios";
import Course from "../../components/course/Course";
import MyGrid from "../../components/my-grid/MyGrid";

import PageHeader from "../../components/page-header/PageHeader";

import "./coursesPage.css";

class CoursesPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      courses: {}
    };
  }

  componentWillMount() {
    axios
      .get("/courses")
      .then(res => {
        console.log("GET /courses");
        console.log(res.data.courses);
        console.log(typeof res.data.courses);
        this.setState({ courses: res.data.courses });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="courses-page-container">
        <PageHeader
          title="University of Florida"
          subTitle="Courses"
          onClick={() => {}}
          icon={Plus}
        />
        <MyGrid
          elements={this.state.courses}
          elementKey="_id"
          component={Course}
        />
      </div>
    );
  }
}

export default CoursesPage;
