import React from "react";
import Grid from "material-ui/Grid";
import axios from "axios";
import Note from "../../components/note/Note";
import "./notes.css";
class Notes extends React.Component {
    constructor() {
        super();
        this.state = {
            notes: []
        };
    }

    componentDidMount() {
        axios
            .get("/notes")
            .then(res => {
                this.setState({ notes: res.data.notes });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="notes-container">
                <h1>University of Florida</h1>
                <h2>Latest notes</h2>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Note />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Note />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Note />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Note />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Note />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <Note />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Notes;
