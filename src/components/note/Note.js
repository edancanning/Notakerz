import React from "react";
import Card, {
    CardHeader,
    CardMedia,
    CardContent,
    CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import red from "material-ui/colors/red";
import { Coffee } from "mdi-material-ui";

import "./note.css";

var Note = props => {
    return (
        <div className="note-component">
            <Card>
                <CardHeader
                    avatar={<Avatar aria-label="Recipe">R</Avatar>}
                    action={
                        <IconButton>
                            <Coffee />
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    image="/static/images/cards/paella.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography component="p">
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <Coffee />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <Coffee />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default Note;
