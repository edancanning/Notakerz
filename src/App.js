import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Menus from "./containers/menus/Menus";
import Notes from "./containers/notes/Notes";
import "./App.css";
import "typeface-roboto";

class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <BrowserRouter>
                <div className="app-container">
                    <Menus />
                    <div className="view-offset">
                        <Route exact path="/" component={Notes} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
