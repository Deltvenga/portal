import React, {Component} from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import './UserList.css';
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import axios from "axios";
import { Cookies } from 'react-cookie';
import Header from "../Common/Header";

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
        const cookies = new Cookies();
        this.state = {
            currentUser: cookies.get('userId'),
            userData: null,
            classes: classes
        }
        this.loadUsers();
    }
    loadUsers() {
        const self = this;
        axios.get('http://localhost:9000/getAllUsers', null).then((data) => {
            console.log(data);
            self.setState({userData: data.data})
        });
    }

    loadListItem(user, index) {
        if (user._id !== this.state.currentUser) {
            return (
               <ListItem key={index} alignItems="flex-start">
                   <ListItemAvatar>
                       <Avatar src={user._id ? `http://localhost:9000/getAva?userId=${user._id}&imageId=${this.props.imageId}` : ''} />
                   </ListItemAvatar>
                   <ListItemText
                      primary={user.name}
                      secondary={
                          <React.Fragment>
                              <Typography
                                 component="span"
                                 variant="body2"
                                 className={classes.inline}
                                 color="textPrimary"
                              >
                                  level: {user.level + " "}
                              </Typography>
                              {user.role}
                          </React.Fragment>
                      }
                   />
               </ListItem>
            )
        }
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <Header headerTitle={this.state.currentScreen}/>
                <List>
                    {this.state.userData ? this.state.userData.map((user, index) => {
                        return this.loadListItem(user, index);
                    }) : null }
                </List>
            </div>
        );
    }
}
