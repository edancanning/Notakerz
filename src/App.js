import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Menus from "./containers/menus/Menus";
import Notes from "./containers/notes/Notes";
import NotePage from "./containers/note-page/NotePage";
import { MuiThemeProvider, createMuiTheme } from "material-ui";
import { primary, accent } from "./utils/colors";
import "./utils/reset.css";
import "./App.css";
import "typeface-roboto";
import { setInterval, clearImmediate } from "timers";

const theme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: accent
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      linearProgress: 0,
      linearProgressInterval: null
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app-container">
          <MuiThemeProvider theme={theme}>
            <Menus />
            <div className="view-offset">
              <Route
                exact
                path="/"
                render={props => (
                  <Notes startLinearProgress={this.startLinearProgress} />
                )}
              />
              <Route exact path="/notes/:id" component={NotePage} />
            </div>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
