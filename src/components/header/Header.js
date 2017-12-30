import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import Hidden from "material-ui/Hidden";
import Menu, { MenuItem } from "material-ui/Menu";
import { Menu as MenuIcon, School, Magnify } from "mdi-material-ui";
import "./header.css";

var Header = props => {
    const { auth, anchorEl } = props;
    const open = Boolean(props.anchorEl);

    return (
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            onClick={props.toggleSidebar}
                            xsDown
                            aria-label="Menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <div className="search">
                        <div className="magnify">
                            <Magnify />
                        </div>
                        <div className="search-container">
                            <input type="text" placeholder="Search" />
                        </div>
                    </div>
                    {auth && (
                        <div>
                            <IconButton
                                aria-owns={open ? "menu-appbar" : null}
                                aria-haspopup="true"
                                onClick={props.handleMenu}
                            >
                                <School />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={open}
                                onClose={props.handleClose}
                            >
                                <MenuItem onClick={props.handleClose}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={props.handleClose}>
                                    My account
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
