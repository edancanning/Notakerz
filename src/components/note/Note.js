import React from "react";
import { Paper, Avatar, ButtonBase } from "material-ui/";
import { Link } from "react-router-dom";

import { timeSince, courseToTitle } from "../../utils/utils";
import "./note.css";

var Note = props => {
  return (
    <div className="note-component">
      <Link
        to={`notes/${props._id}`}
        style={{ textDecoration: "none", color: "none" }}
      >
        <Paper>
          <ButtonBase focusRipple className="ripple">
            <div className="header">
              <Avatar className="avatar">
                {props.notaker.handle.charAt(0).toUpperCase()}
              </Avatar>
              <div className="notaker-container">
                <p className="notaker">{props.notaker.handle}</p>
                <p className="created-at">{timeSince(props.createdAt)}</p>
              </div>
              <div className="price-container">
                <p className="price">{`$${props.price}`}</p>
              </div>
            </div>
            <div
              className="thumbnail"
              style={{
                backgroundImage: `url(${props.thumbnail})`
              }}
            />
            <div className="footer">
              <p className="course">
                {courseToTitle(
                  props.course.code,
                  props.course.semester,
                  props.course.year,
                  props.course.professor
                )}
              </p>
              <p className="title">{props.title}</p>
            </div>
          </ButtonBase>
        </Paper>
      </Link>
    </div>
  );
};

export default Note;
