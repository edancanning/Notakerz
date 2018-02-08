import React from "react";
import { Plus } from "mdi-material-ui";
import { Grid, CircularProgress } from "material-ui";
import axios from "axios";
import Course from "../../components/course/Course";

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

  renderCourses = () => {
    if (this.state.courses.length > 0) {
      return this.state.courses.map(course => (
        <Grid key={course._id} item xs={12} sm={6} lg={4}>
          <Course {...course} />
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
  render() {
    return (
      <div className="courses-page-container">
        <PageHeader
          title="University of Florida"
          subTitle="Courses"
          onClick={() => {}}
        >
          <Plus />
        </PageHeader>
        <Grid container className="grid-container" spacing={24}>
          {this.renderCourses()}
        </Grid>
      </div>
    );
  }
}

export default CoursesPage;
