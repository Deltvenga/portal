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

export class TaskDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersListData: [],
            isAutoCompleteLoading: true,
            isAutoCompleteOpened: false,
            curUser: ""
        }
    }

    handleClose() {
        axios.post('http://localhost:9000/newTask', null, {
            params: {
                targetUserId: "6050c91025b4d348d59f8c88",
                title: "тест отправки",
                description: "тест описания",
                ownerId: "6050c91025b4d348d59f8c88",
                endDate: "03-18-21"
            }
        }).then((response) => {
            console.log(response);
            this.props.close();
        })
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

    curUserChanged(event, data) {
        this.setState({curUser: data && data._id});
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
                            />
                        </div>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <TextField
                                id="outlined-multiline-static"
                                label="Описание задачи"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <Autocomplete
                                id="combo-box-demo"
                                options={this.state.usersListData}
                                loading={true}
                                onOpen={() => {this.isAutocompleteOpened()}}
                                getOptionLabel={(opt) => this.getName(opt, true) }
                                onChange={(event,data) => {this.curUserChanged(event, data)}}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <div className="App-TaskScreen-TaskDialog__UserOption">
                                            <Avatar
                                                src={option._id ? `http://localhost:9000/getAva?userId=${option._id}&imageId=${this.props.imageId}` : ''} />
                                            <div className="App-TaskScreen-TaskDialog__UserOption-name">{this.getName(option)}</div>
                                        </div>
                                    </React.Fragment>
                                )}
                                style={{ width: "auto" }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Исполнитель"
                                        variant="outlined"
                                    />}
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
                            this.handleClose()
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

    isAutocompleteOpened() {
        this.setState({isAutoCompleteOpened: true});
        axios.get('http://localhost:9000/getAllUsers', null).then((data) => {
            this.setState({usersListData: data.data, isAutoCompleteLoading: false});
        });
    }
}

export default TaskDialog;
