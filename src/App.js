import React from "react";
import Menus from "./containers/menus/Menus";
import "./App.css";
import "typeface-roboto";

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="app">
                <Menus />
            </div>
        );
    }
}

export default App;
