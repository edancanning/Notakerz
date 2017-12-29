import React, { Component } from "react";
import logo from "./logo.svg";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar />
            </div>
        );
    }
}

export default App;
