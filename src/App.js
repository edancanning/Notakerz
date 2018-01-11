import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Menus from "./containers/menus/Menus";
import Notes from "./containers/notes/Notes";
import { MuiThemeProvider, createMuiTheme } from "material-ui";
import { primary, accent } from "./utils/colors";
import "./App.css";
import "typeface-roboto";

const theme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: accent
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <MuiThemeProvider theme={theme}>
            <Menus />
            <div className="view-offset">
              <Route exact path="/" component={Notes} />
            </div>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
