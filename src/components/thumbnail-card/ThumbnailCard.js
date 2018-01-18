import React from "react";
import { Paper, ButtonBase } from "material-ui";
import { FileWord, FilePdf, FilePowerpoint } from "mdi-material-ui";

import "./thumbnailCard.css";

function fileIconHandler(type) {
  if (type === "pdf") {
    return <FilePdf className="file-icon" />;
  } else if (type === "docx" || type === "doc") {
    return <FileWord className="file-icon" />;
  } else if (type === "ppt") {
    return <FilePowerpoint className="file-icon" />;
  }
}

var ThumbnailCard = props => (
  <Paper className="thumbnail-card-component">
    <ButtonBase
      focusRipple
      className="ripple"
      onClick={() => {
        props.thumbnailClickHandler(props.name);
      }}
    >
      <div className="body">
        <div
          className="thumbnail"
          style={{
            backgroundImage: `url(${props.thumbnail})`
          }}
        />
      </div>
      <div className={props.highlight ? "highlight footer" : "footer"}>
        {fileIconHandler("pdf")}
        <p className="file-name">{props.name}</p>
      </div>
    </ButtonBase>
  </Paper>
);

export default ThumbnailCard;
