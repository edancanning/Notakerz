import React from "react";
import { CircularProgress } from "material-ui";

import "./loader.css";

var Loader = props => (
  <div className="loader-component">
    <CircularProgress className="loader" size={75} />
  </div>
);

export default Loader;
