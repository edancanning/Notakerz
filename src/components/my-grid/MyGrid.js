import React from "react";
import { CircularProgress, Grid } from "material-ui";

import "./myGrid.css";

function renderGrid(elements, Component, props, key) {
  if (elements.length > 0) {
    return elements.map(element => (
      // key describes the propery name which should be the key
      <Grid key={element[key]} item xs={12} sm={6} lg={4}>
        <Component {...element} {...props} />
      </Grid>
    ));
  } else {
    return (
      <Grid item className="loader-container" xs={12}>
        <CircularProgress className="loader" size={75} />
      </Grid>
    );
  }
}

var MyGrid = props => (
  <Grid container className="grid-component" spacing={24}>
    {renderGrid(
      props.elements,
      props.component,
      props.componentProps,
      props.elementKey
    )}
  </Grid>
);
export default MyGrid;
