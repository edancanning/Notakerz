import React from "react";
import { Avatar } from "material-ui";
import { timeSince } from "../../utils/utils";

import "./userAvatar.css";

var UserAvatar = props => (
  <div className="user-avatar-component">
    <div className="header">
      <Avatar className="avatar">
        {props.notakerHandle.charAt(0).toUpperCase()}
      </Avatar>
      <div className="notaker-container">
        <p className="notaker">{props.notakerHandle}</p>
        <p className="created-at">{timeSince(props.createdAt)}</p>
      </div>
      {/* if price prop has value, render the price */}
      {props.price ? (
        <div className="price-container">
          <p className="price">{`$${props.price}`}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
);

export default UserAvatar;
