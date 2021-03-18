import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import "./TaskScreen.css"
import Box from "@material-ui/core/Box";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";



export class TaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverNumber: 0,
            curTask: {
                id: 0,
                date: '03-18-21',
                title: "Задача № 1, добавить реестр задач",
                additionalData: "Надо добавить большое описание задачи, желательно совсем большое"
            },
            isTaskOpened: false,
            data: [
                {
                    id: 0,
                    date: '03-18-21',
                    title: "Задача № 1, добавить реестр задач",
                    additionalData: "Надо добавить большое описание задачи, желательно совсем большое"
                }, {
                    id: 1,
                    date: '03-19-21',
                    title: "Задача № 1, добавить реестр задач",
                    additionalData: "Надо добавить большое описание задачи, желательно совсем большое Надо добавить большое описание задачи, желательно совсем большое Надо добавить большое описание задачи, желательно совсем большое"
                }, {
                    id: 2,
                    date: '03-19-21',
                    title: "Задача № 1, добавить реестр задач",
                    additionalData: "Надо добавить большое описание задачи, желательно совсем большое"
                }, {
                    id: 3,
                    date: '03-30-21',
                    title: "Задача № 1, добавить реестр задач",
                    additionalData: "Надо добавить большое описание задачи, желательно совсем большое"
                }, {
                    id: 4,
                    date: '03-19-21',
                    title: "Задача № 1, добавить реестр задач",
                    additionalData: "Надо добавить большое описание задачи, желательно совсем большое"
                },
            ]

        }
    }



    getFormattedDate(value) {

        function pad2(n) {
            return (n < 10 ? '0' : '') + n;
        }

        let recDate = new Date(value.date);
        let curDate = new Date();
        let utc1 = Date.UTC(recDate.getFullYear(), recDate.getMonth(), recDate.getDate());
        let utc2 = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate());
        let diffDays = Math.ceil(Math.abs(utc1 - utc2) / (1000 * 60 * 60 * 24));
        let dateFormatted = `${pad2(recDate.getDate())}.${pad2(recDate.getMonth())}.${recDate.getFullYear()}`

        if(diffDays <= 0) {
            return (
                <Box color="error.main">{dateFormatted}</Box>
            )
        } else if(diffDays === 1) {
            return (
                <Box color="warning.main">{dateFormatted}</Box>
            )
        } else {
            return (
                <div>{dateFormatted}</div>
            )
        }
    }

    render() {
        return (
            <div>
                <SwipeableDrawer
                    anchor={'right'}
                    open={this.state.isTaskOpened}
                    onClose={() => {this.setState({isTaskOpened: false})}}
                >
                    <Card variant="outlined">
                        <CardContent>
                            <div className="App-TaskScreen-ListItem__taskScreen">
                                <div>test</div>
                                <div>{this.state.curTask.title}</div>
                                <div>{this.state.curTask.additionalData}</div>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => {this.setState({isTaskOpened: false})}}>Закрыть</Button>
                        </CardActions>
                    </Card>
                </SwipeableDrawer>
                <Paper>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button disabled={true}>Выделено: 0</Button>
                        <Button color="primary">Выделить все</Button>
                        <Button color="secondary">Снять выделение</Button>
                    </ButtonGroup>
                </Paper>
                <List>
                    {this.state.data.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem key={value.id} button onClick={() => {this.setState({curTask: value, isTaskOpened: true})}}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Task 1`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={value.id} >
                                    <div className="App-TaskScreen-ListItem__mainBlock">
                                        <div className="App-TaskScreen-ListItem__mainBlock-container">
                                            <div className="App-TaskScreen-ListItem__mainBlock-title">{value.title}</div>
                                            <div className="App-TaskScreen-ListItem__mainBlock-caption">{value.additionalData}</div>
                                        </div>
                                        <div className="App-TaskScreen-ListItem__mainBlock-date">{this.getFormattedDate(value)}</div>
                                    </div>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        // onChange={handleToggle(value)}
                                        // checked={checked.indexOf(value) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default TaskScreen;
