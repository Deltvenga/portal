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

export class TaskDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClose() {
        axios.post('http://localhost:9000/newTask', null, {
            params: {
                targetUserId: "6050c91025b4d348d59f8c88",
                title: "тест отправки",
                description: "тест описания",
                ownerId: "6050c91025b4d348d59f8c88",
                endDate: "03-18-21",
            }
        }).then((response) => {
            console.log(response);
            this.props.close();
        })
    };

    handleOpen() {

    };



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
                            <TextField
                                id="outlined-multiline-static"
                                label="Исполнитель"
                                variant="outlined"
                                fullWidth
                            />
                        </div>
                        <div className="App-TaskScreen-TaskDialog__InputBlock">
                            <TextField
                                id="date"
                                label="Дата завершения"
                                type="date"
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
}

export default TaskDialog;
