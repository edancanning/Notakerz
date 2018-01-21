import React from "react";
import { Button, CircularProgress } from "material-ui";

import "./stepThree.css";

var StepThree = props => (
  <div className="step-three-component">
    {props.loadingFilePublish ? (
      <div className="loader-container">
        <p className="publishing">Publishing...</p>
        <CircularProgress className="loader" size={68} />
      </div>
    ) : (
      <div>
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
    )}
  </div>
);

export default StepThree;
