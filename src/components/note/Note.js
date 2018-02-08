import React from "react";
import { Paper, ButtonBase } from "material-ui/";
import { Link } from "react-router-dom";
import UserAvatar from "../user-avatar/UserAvatar";
import { courseToTitle } from "../../utils/utils";
import "./note.css";

var Note = props => {
  return (
    <div className="note-component">
      <Link to={`notes/${props._id}`} style={{ textDecoration: "none" }}>
        <Paper>
          <ButtonBase focusRipple className="ripple">
            <div className="user-avatar">
              <UserAvatar
                className="user-avatar"
                notakerHandle={props.notaker.handle}
                createdAt={props.createdAt}
                price={props.price}
              />
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
