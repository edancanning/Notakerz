import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Input,
  Select,
  TextField,
  FormHelperText,
  InputAdornment
} from "material-ui";

import { courseToTitle } from "../../../utils/utils";
import "./stepOne.css";

var StepOne = props => (
  <div className="step-one-component">
    <form className="form" autoComplete="off">
      <FormControl
        required
        className="input-field"
        error={props.universityError}
      >
        <InputLabel htmlFor="university">University</InputLabel>
        <Select
          value={props.universityId}
          onChange={props.handleInputChange}
          input={<Input name="universityId" id="universityId" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.universities.map(university => (
            <MenuItem key={university._id} value={university._id}>
              {university.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className="input-field" error={props.courseError}>
        <InputLabel htmlFor="course">Course</InputLabel>
        <Select
          value={props.courseId}
          onChange={props.handleInputChange}
          input={<Input name="courseId" id="courseId" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {props.courses.map((course, index) => (
            <MenuItem key={course._id} value={course._id}>
              {courseToTitle(
                course.code,
                course.semester,
                course.year,
                course.professor
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        error={props.titleError}
        name="title"
        className="input-field"
        required
        id="course-title"
        label="Course Title"
        value={props.title}
        margin="normal"
        helperText={`Min ${props.TITLE_MIN_LENGTH} characters`}
        onChange={props.handleTitleChange}
      />
      <TextField
        error={props.descriptionError}
        name="description"
        className="input-field"
        required
        id="course-description"
        label="Course Description"
        value={props.description}
        margin="normal"
        multiline
        onChange={props.handleDescriptionChange}
        helperText={`Min ${props.DESCRIPTION_MIN_LENGTH} characters`}
      />
      <FormControl required className="input-field" error={props.priceError}>
        <InputLabel htmlFor="price">Price</InputLabel>
        <Input
          id="price"
          value={props.price}
          onChange={props.handlePriceChange}
          name="price"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
        <FormHelperText>Max $9.99</FormHelperText>
      </FormControl>
    </form>
    <div className="step-buttons">
      <Button disabled onClick={props.handleBack}>
        Back
      </Button>
      <Button
        className="next-button"
        raised
        color="accent"
        onClick={props.stepOneNext}
      >
        Next
      </Button>
    </div>
  </div>
);

export default StepOne;
