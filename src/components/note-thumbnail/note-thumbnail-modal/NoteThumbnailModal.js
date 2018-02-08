import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent
} from "material-ui";
import { trimFileName } from "../../../utils/utils";
import "./noteThumbnailModal.css";

var NoteThumbnailModal = props => (
  <Dialog
    className="note-thumbnail-modal-component"
    open={props.open}
    keepMounted
    onClose={props.handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">
      {trimFileName(props.title)}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        <p>
          <strong>File Type: </strong>
          {props.fileType}
        </p>
        <p>
          <strong>Pages: </strong>
          {props.pages}
        </p>
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

export default NoteThumbnailModal;
