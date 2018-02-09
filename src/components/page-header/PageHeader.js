import React from "react";
import { Button } from "material-ui";

import "./pageHeader.css";

var PageHeader = props => {
  var Icon = props.icon;
  return (
    <div className="page-header-components">
      <div className="title">
        <h1>{props.title}</h1>
        <h2>{props.subTitle}</h2>
      </div>
      <Button
        className="action-button"
        onClick={props.onClick}
        fab
        color="accent"
      >
        {/* if icon exists render it */}
        {Icon && <Icon />}
      </Button>
    </div>
  );
};

export default PageHeader;
