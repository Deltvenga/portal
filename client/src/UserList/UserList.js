import React, {Component} from 'react';
import {
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import './UserList.css';
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";

const classes = {
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            classes: classes
        }
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" I'll be in your neighborhood doing errands this"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            </div>
        );
    }
}