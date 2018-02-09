import React from "react";
import { Paper, ButtonBase } from "material-ui";
import { Link } from "react-router-dom";
import { courseToTitle } from "../../utils/utils";

import "./course.css";

var Course = props => (
  <Paper className="course-component">
    <Link to={`courses/${props._id}`} className="link">
      <ButtonBase className="ripple">
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
      </ButtonBase>
    </Link>
  </Paper>
);

export default Course;
