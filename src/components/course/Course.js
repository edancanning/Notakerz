import React from "react";
import { Paper, Button } from "material-ui";
import { courseToTitle } from "../../utils/utils";

import "./course.css";

var Course = props => (
  <div className="course-component">
    <Paper>
      <div className="header">
        <p className="code">
          {courseToTitle(
            props.code,
            props.semester,
            props.year,
            props.professor
          )}
        </p>
        <p className="name">{props.name}</p>
      </div>
      <div className="footer">
        <Button color="primary">enroll</Button>
      </div>
    </Paper>
  </div>
);

export default Course;
