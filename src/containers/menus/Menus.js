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
            myCoursesOpen: false,
            sidebarOpen: false
        };
        this.SIDE_BAR_WIDTH = "16rem";
    }

    toggleSidebar = event => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen
        });
    };

    toggleMyCourses = () => {
        this.setState({ myCoursesOpen: !this.state.myCoursesOpen });
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
                    toggleMyCourses={this.toggleMyCourses}
                    sideBarLeft={
                        this.state.sidebarOpen ? "0" : "-" + this.SIDE_BAR_WIDTH
                    }
                    myCoursesOpen={this.state.myCoursesOpen}
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
