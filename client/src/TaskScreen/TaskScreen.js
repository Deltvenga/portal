import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import green from "@material-ui/core/colors/green";
import Header from '../Common/Header'
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import UserPicker from "../Common/UserPicker";



export class TaskScreen extends Component {
    constructor(props) {
        super(props);
        this.classes = makeStyles(() => ({
            green: {
                color: '#fff',
                backgroundColor: green[500],
            },
        }));
        this.state = {
            serverNumber: 0,
            showEnded: false,
            curTask: {
                id: 0,
                date: '03-18-21',
                title: "Задача № 1, добавить реестр задач",
                additionalData: "Надо добавить большое описание задачи, желательно совсем большое"
            },
            isTaskOpened: false,
        }
        this.loadTasksData();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.taskCount !== this.props.taskCount || prevProps.userId !== this.props.userId) {
            this.loadTasksData();
        }
    }

    loadTasksData() {
        const self = this;
        axios.post('http://localhost:9000/getTasks', null, {
            params: {
                userId: this.props.userId,
            }
        }).then((data) => {
            console.log(data);
            self.setState({data: data.data})
        });
    }

    getFormattedDate(value) {

        function pad2(n) {
            return (n < 10 ? '0' : '') + n;
        }

        let recDate = new Date(value.endDate);
        let curDate = new Date();
        let utc1 = Date.UTC(recDate.getFullYear(), recDate.getMonth(), recDate.getDate());
        let utc2 = Date.UTC(curDate.getFullYear(), curDate.getMonth(), curDate.getDate());
        let diffDays = Math.ceil((utc1 - utc2) / (1000 * 60 * 60 * 24));
        let dateFormatted = `${pad2(recDate.getDate())}.${pad2(recDate.getMonth()+1)}.${recDate.getFullYear()}`

        if (value.ended) {
            return (
                <div>{dateFormatted}</div>
            )
        } else if (diffDays === 0) {
            return (
                <Box color="error.main">{dateFormatted}</Box>
            )
        } else if (diffDays === 1) {
            return (
                <Box color="warning.main">{dateFormatted}</Box>
            )
        } else if (diffDays < 0) {
            return (
                <Box className="App-TaskScreen-ListItem__exceptedTask">{dateFormatted}</Box>
            )
        } else {
            return (
                <div>{dateFormatted}</div>
            )
        }
    }

    handleCheckBoxToggle(event, id) {
        const newObj = this.state.data;
        newObj.forEach((item) => {
            if (item.id === id) {
                item.checked = event.target.checked;
            }
        })
        this.setState({data: newObj});
    }

    render() {
        return (
            <div>
                <Header headerTitle={this.state.currentScreen}/>
                { this.state.curTask ? (
                    <SwipeableDrawer
                        anchor={'right'}
                        open={this.state.isTaskOpened}
                        onClose={() => {
                            this.setState({isTaskOpened: false})
                        }}>
                        <Card variant="outlined">
                            <CardContent>
                                <div className="App-TaskScreen-ListItem__taskScreen">
                                    <div>test</div>
                                    <div>{this.state.curTask.title}</div>
                                    <div>{this.state.curTask.additionalData}</div>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => {
                                    this.setState({isTaskOpened: false})
                                }}>
                                    Закрыть
                                </Button>
                            </CardActions>
                        </Card>
                        <Card>
                            <CardContent>
                                <Card>
                                    <CardContent>
                                        <TextField
                                            fullWidth
                                            label="Комментарий"
                                        />
                                        <Button fullWidth color="primary" >
                                            Выполнить
                                        </Button>
                                        <Button color="secondary" fullWidth>
                                            Уточнить
                                        </Button>
                                    </CardContent>
                                </Card>
                                <br/>
                                <Card>
                                    <CardContent>
                                        <UserPicker curUserChanged={(data) => {this.setState({curUser: data});}}/>
                                        <Button fullWidth color="primary" >
                                            Переназначить
                                        </Button>
                                    </CardContent>
                                </Card>
                                <br/>
                                <Card>
                                    <CardContent>
                                        <Button
                                            color="secondary"
                                            fullWidth
                                            onClick={() => {
                                                this.setState({isTaskOpened: false})
                                            }}>
                                            Закрыть
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </SwipeableDrawer>
                ) : '' }

                <Paper>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button disabled={true}>Выделено: 0</Button>
                        <Button color="primary">Выделить все</Button>
                        <Button color="secondary">Снять выделение</Button>
                        <Button>
                            <FormControlLabel
                                value="start"
                                control={
                                    <Checkbox
                                        checked={this.state.showEnded}
                                        onChange={(e) => {
                                            this.setState({showEnded: e.target.checked})
                                        }}
                                        color="primary"/>
                                }
                                label="Показывать выполненные"
                                labelPlacement="start"
                            />
                        </Button>
                    </ButtonGroup>
                </Paper>
                <List>
                    {this.state.data && this.state.data.map((value) => {
                        return (this.state.showEnded && value.ended) || !value.ended ? (
                            <ListItem
                                className={this.state.showEnded && value.ended ? 'App-TaskScreen-ListItem__endedTask' : ''}
                                key={value.id}
                                button
                                onClick={() => {
                                    this.setState({curTask: value, isTaskOpened: true})
                                }}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={`Task 1`}
                                    />
                                </ListItemAvatar>
                                <ListItemText id={value.id}>
                                    <div className="App-TaskScreen-ListItem__mainBlock">
                                        <div className="App-TaskScreen-ListItem__mainBlock-container">
                                            <div
                                                className="App-TaskScreen-ListItem__mainBlock-title">{value.title}</div>
                                            <div
                                                className="App-TaskScreen-ListItem__mainBlock-caption">{value.additionalData}</div>
                                        </div>
                                        <div
                                            className="App-TaskScreen-ListItem__mainBlock-date">{this.getFormattedDate(value)}</div>
                                    </div>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={(e) => {
                                            this.handleCheckBoxToggle(e, value.id)
                                        }}
                                        checked={value.checked}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ) : '';
                    })}
                </List>
            </div>
        );
    }
}

export default TaskScreen;
