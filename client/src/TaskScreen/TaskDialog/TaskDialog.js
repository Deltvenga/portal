import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import "./TaskDialog.css"

export class TaskDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClose() {
        this.props.close();
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
