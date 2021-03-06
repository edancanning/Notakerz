import React from "react";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";
import {
  FileDocument,
  ChevronUp,
  ChevronDown,
  BookOpenPageVariant,
  Star
} from "mdi-material-ui";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import gabbie from "../../img/gabbie.png";
import "./sidebar.css";

var Sidebar = props => (
  <Paper>
    <div className="sidebar-component" style={{ left: props.sideBarLeft }}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Notakerz logo" />
        </Link>
      </div>
      <div className="profile">
        <div className="shift">
          <Paper className="profile-img" elevation={3}>
            <img src={gabbie} alt="Profile pic" />
          </Paper>
          <Typography className="handle" type="body2">
            Gabceline
          </Typography>
          <Typography className="email" type="body1">
            gabceline@ufl.edu
          </Typography>
          <Typography className="sign-out" type="button">
            sign out
          </Typography>
        </div>
      </div>
      <div className="nav">
        <List>
          <Link className="link" to="/">
            <ListItem className="button" button>
              <ListItemIcon>
                <FileDocument />
              </ListItemIcon>
              <ListItemText inset primary="Notes" />
            </ListItem>
          </Link>
          <Link className="link" to="/courses">
            <ListItem className="button" button>
              <ListItemIcon>
                <BookOpenPageVariant />
              </ListItemIcon>
              <ListItemText inset primary="Courses" />
            </ListItem>
          </Link>
          <ListItem button onClick={props.toggleMyCourses}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText inset primary="My Courses" />
            {props.myCoursesOpen ? <ChevronUp /> : <ChevronDown />}
          </ListItem>
          <Collapse
            component="li"
            in={props.myCoursesOpen}
            timeout="auto"
            unmountOnExit
          >
            <List disablePadding>
              <ListItem className="indent" button>
                <ListItemText inset primary="MAC 2312" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  </Paper>
);

export default Sidebar;
