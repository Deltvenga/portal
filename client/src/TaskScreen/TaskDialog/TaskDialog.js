import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import "./TaskDialog.css"
import axios from "axios";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Avatar} from "@material-ui/core";
import UserPicker from "../../Common/UserPicker";

export class TaskDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersListData: [],
            isAutoCompleteLoading: true,
            isAutoCompleteOpened: false,
            curUser: "",
            taskDescription: '',
            taskTitle: '',
            currentEndDate: new Date()
        }
    }

    handleClose(isCancel) {
        if(!isCancel) {
            axios.post('http://localhost:9000/newTask', null, {
                params: {
                    targetUserId: this.state.curUser._id,
                    title: this.state.taskTitle,
                    description: this.state.taskDescription,
                    ownerId: "6050c91025b4d348d59f8c88",
                    endDate: this.state.currentEndDate
                }
            }).then((response) => {
                console.log(response);
                this.props.close();
            })
        } else {
            this.props.close();
        }

    };

    handleOpen() {

    };

    getName(data, isSimple) {
        if (data.name) {
            if(!data.surname) {
                return data.name;
            }
            if(isSimple) {
                return data.name + " " + data.surname[0] + ".";
            } else {
                return data.name + " " + data.surname;

            }
        }
    }



    render() {
        return (
            <div>
                <Dialog open={this.props.isOpen} onClose={() => {
                    this.handleClose()
                }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Новая задача</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Опишите текст и суть задачи максимально лаконично
                        </DialogContentText>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Заголовок задачи"
                                fullWidth
                                variant="outlined"
                                value={this.state.taskTitle}
                                onChange={(event) => {
                                    this.setState({taskTitle: event.target.value})}
                                }
                            />
                        </div>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <TextField
                                id="outlined-multiline-static"
                                label="Описание задачи"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={this.state.taskDescription}
                                onChange={(event) => {
                                    this.setState({taskDescription: event.target.value})}
                                }
                                fullWidth
                            />
                        </div>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <UserPicker
                                curUserChanged={(data) => {this.setState({curUser: data});}}
                            />
                        </div>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <TextField
                                id="date"
                                label="Дата завершения"
                                type="date"
                                onChange={(event) => {
                                    this.setState({currentEndDate: event.target.value})}
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" color="secondary" onClick={() => {
                            this.handleClose(true)
                        }}>
                            Отмена
                        </Button>
                        <Button size="large" onClick={() => {
                            this.handleClose()
                        }} color="primary">
                            Создать
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default TaskDialog;
