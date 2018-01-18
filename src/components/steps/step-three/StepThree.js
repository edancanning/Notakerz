import React from "react";
import { Button } from "material-ui";

import "./stepThree.css";

var StepThree = props => (
  <div className="step-three-component">
    <div className="agreement">
      <p className="message">Almost Done!</p>
      <p className="terms">
        By publishing, you agree to the <span>terms and conditions</span>
      </p>
    </div>
    <div className="step-buttons">
      <Button onClick={props.handleBack}>Back</Button>
      <Button
        className="next-button"
        raised
        color="accent"
        onClick={props.stepThreeNext}
      >
        Publish
      </Button>
    </div>
  </div>
);

export default StepThree;
