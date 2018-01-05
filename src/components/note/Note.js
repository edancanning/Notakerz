import React from "react";
import { IconButton, Paper, Avatar } from "material-ui/";
import { Coffee, Cart } from "mdi-material-ui";

import { timeSince } from "../../utils/utils";
import "./note.css";

var Note = props => {
    return (
        <div className="note-component">
            <Paper>
                <div className="header">
                    <Avatar>{props.notaker.charAt(0).toUpperCase()}</Avatar>
                    <div className="notaker-container">
                        <p className="notaker">{props.notaker}</p>
                        <p className="created-at">
                            {timeSince(props.createdAt)}
                        </p>
                    </div>
                    <div className="price-container">
                        <p className="price">{`$${props.price}`}</p>
                    </div>
                </div>
                <div
                    className="thumbnail"
                    style={{
                        backgroundImage: `url(${props.files[0].thumbnailUrl})`
                    }}
                />
                <div className="footer">
                    <p className="course">{props.course.name}</p>
                    <p className="title">{props.title}</p>
                </div>
            </Paper>
        </div>
    );
};

export default Note;
