import React from "react";
import { Paper, ButtonBase } from "material-ui";
import { FileWord, FilePdf, FilePowerpoint } from "mdi-material-ui";

import "./noteThumbnail.css";

function fileIconHandler(type, iconWidth) {
  var attr = {
    className: "file-icon",
    style: {
      width: `${iconWidth}rem`
    }
  };
  if (type === "pdf") {
    return <FilePdf {...attr} />;
  } else if (type === "docx" || type === "doc") {
    return <FileWord {...attr} />;
  } else if (type === "ppt") {
    return <FilePowerpoint {...attr} />;
  }
}

var NoteThumbnail = props => (
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
            backgroundImage: `url(${props.thumbnail})`,
            height: `${props.height}rem`
          }}
        />
      </div>
      <div
        className={
          props.isNoteThumbnail && props.highlightThumbnail
            ? "highlight footer"
            : "footer"
        }
        style={{
          paddingTop: `${props.footerPadding}rem`,
          paddingBottom: `${props.footerPadding}rem`
        }}
      >
        {fileIconHandler("pdf", props.iconWidth)}
        <p className="file-name" style={{ fontSize: `${props.fontSize}rem` }}>
          {props.name}
        </p>
      </div>
    </ButtonBase>
  </Paper>
);

export default NoteThumbnail;
