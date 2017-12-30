import React from "react";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import ListSubheader from "material-ui/List/ListSubheader";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";
import {
    FileDocument,
    ChevronUp,
    ChevronDown,
    BookOpenPageVariant,
    Star,
    StarOutline
} from "mdi-material-ui";
import logo from "../../img/logo.png";
import gabbie from "../../img/gabbie.png";
import "./sidebar.css";

var Sidebar = props => (
    <div className="sidebar" style={{ left: props.sideBarLeft }}>
        <div className="logo">
            <img src={logo} alt="Notakerz logo" />
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
                <ListItem button>
                    <ListItemIcon>
                        <FileDocument />
                    </ListItemIcon>
                    <ListItemText inset primary="Notes" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BookOpenPageVariant />
                    </ListItemIcon>
                    <ListItemText inset primary="Courses" />
                </ListItem>
                <ListItem button onClick={props.handleClick}>
                    <ListItemIcon>
                        <Star />
                    </ListItemIcon>
                    <ListItemText inset primary="My Courses" />
                    {props.open ? <ChevronUp /> : <ChevronDown />}
                </ListItem>
                <Collapse
                    component="li"
                    in={props.open}
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
);

export default Sidebar;
