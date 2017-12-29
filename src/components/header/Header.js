import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import AccountCircle from "material-ui-icons/AccountCircle";
import Menu, { MenuItem } from "material-ui/Menu";
import {
    Menu as MenuIcon,
    School as SchoolIcon,
    Magnify as MagnifyIcon
} from "mdi-material-ui";
import "./header.css";

class Header extends React.Component {
    state = {
        auth: true,
        anchorEl: null
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className="header">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <div className="search">
                            <div className="magnify">
                                <MagnifyIcon />
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
                                    onClick={this.handleMenu}
                                >
                                    <SchoolIcon />
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
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={this.handleClose}>
                                        My account
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
