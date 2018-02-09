import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Menus from "./containers/menus/Menus";
import NotesPage from "./containers/notes-page/NotesPage";
import CoursesPage from "./containers/courses-page/CoursesPage";
import CoursePage from "./containers/course-page/CoursePage";
import NotePage from "./containers/note-page/NotePage";
import { MuiThemeProvider, createMuiTheme } from "material-ui";
import { primary, accent } from "./utils/colors";
import "./utils/reset.css";
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
              <Route exact path="/" component={NotesPage} />
              <Route exact path="/courses" component={CoursesPage} />
              <Route exact path="/notes/:id" component={NotePage} />
              <Route exact path="/courses/:id" component={CoursePage} />
            </div>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
