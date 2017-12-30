import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import "./menus.css";

class Menus extends React.Component {
    constructor() {
        super();
        this.state = {
            auth: true,
            anchorEl: null,
            open: true,
            sidebarOpen: false
        };
        this.SIDE_BAR_WIDTH = "16rem";
    }

    toggleSidebar = event => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    };

    // example boilerplate

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        return (
            <div className="menus">
                <div
                    className={
                        this.state.sidebarOpen ? "blacken" : "blacken hide"
                    }
                    onClick={this.toggleSidebar}
                />
                <Sidebar
                    handleClick={this.handleClick}
                    sideBarLeft={
                        this.state.sidebarOpen ? "0" : "-" + this.SIDE_BAR_WIDTH
                    }
                />
                <Header
                    toggleSidebar={this.toggleSidebar}
                    handleClose={this.handleClose}
                    handleMenu={this.handleMenu}
                    handleChange={this.handleChange}
                    auth={this.state.auth}
                    anchorEl={this.state.anchorEl}
                />
            </div>
        );
    }
}

export default Menus;
