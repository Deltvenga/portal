import React, {Component} from 'react';
import './App.css';
import LeftMenu from "./LeftMenu/LeftMenu";
import TaskScreen from "./TaskScreen/TaskScreen";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TaskDialog from "./TaskScreen/TaskDialog/TaskDialog";
import ShopScreen from "./ShopScreen/ShopScreen";
import Profile from "./UserProfile/Profile";
import Header from "./Common/Header"
import Button from "@material-ui/core/Button";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import FormData from 'form-data'
import UserList from "./UserList/UserList";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greenSnackOpen: false,
            taskCount: 0,
            greenSnackText: '',
            serverNumber: 0,
            currentScreen: 'taskScreen', // taskScreen, userProfile, usersList, shop, ...
            isTaskDialogOpen: false,
            goods: [],
            userScore: 0,
            imageId: 0,
            userLogin: "Ivanov@mail.ru",
            userData: null
        }
        this.screenChanger.bind(this);
        this.loadUserData();
        this.subscribeToEvents();
    }

    changeImageState() {
        this.setState({imageId: this.state.imageId + 1});
    }

    getCurrentScreen() {
        if (this.state.currentScreen === 'taskScreen') {
            return (
                <TaskScreen
                    taskCount={this.state.taskCount}
                    userId={this.state.userData && this.state.userData._id}
                />
            );
        }
        if (this.state.currentScreen === 'userProfile') {
            return (
                <Profile
                    changeImage={() => {
                        this.changeImageState()
                    }}
                    imageId={this.state.imageId}
                    userData={this.state.userData}/>
            );
        }
        if (this.state.currentScreen === 'usersList') {
            return (
                <UserList/>
            );
        }
        if (this.state.currentScreen === 'shop') {
            return (
                <ShopScreen
                    goods={this.state.goods}
                    userScore={this.state.userScore}
                    userData={this.state.userData}/>
            );
        }
        if (this.state.currentScreen === 'stats') {
            return (
                <div>
                    stats
                    {this.state.serverNumber}
                    <Button onClick={() => {
                        this.subscribeToEvents()
                    }} variant="contained">subscribe to events</Button>
                    <Button onClick={() => {
                        this.sendMessage()
                    }} variant="contained">start spam</Button><br/>
                    <input type="file" name="file" onChange={(e) => {
                        this.processImage(e)
                    }}/>
                    <img
                        src={'http://localhost:9000/getAva?userId=' + this.state.userData._id + "&imageId=" + this.state.imageId}/>
                </div>

            );
        }
        if (this.state.currentScreen === 'control') {
            return (
                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Добавить сотрудника</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <TextField id="filled-basic" label="Имя" variant="filled"/><br/>
                                <TextField id="filled-basic" label="Пароль" variant="filled"/><br/>
                                <TextField id="filled-basic" label="E-mail" variant="filled"/>
                                <InputLabel id="access-level">Type</InputLabel>
                                <Select
                                    labelId="access-level"
                                    value={0}
                                >
                                    <MenuItem value={0}>Сотрудник</MenuItem>
                                    <MenuItem value={20}>Администратор</MenuItem>
                                </Select>
                                <Button>
                                    Добавить
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Выдать ачивку</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Процесс выдачи ачивки...
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </div>

            );
        }
    }

    processImage(e) {
        let data = new FormData();
        data.append('file', e.target.files[0], e.target.files[0].name);
        axios.post("http://localhost:9000/upload", data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
            .then((response) => {
            }).catch((error) => {
        });
    }

    subscribeToEvents() {
        const events = new EventSource('http://localhost:9000/events')
        events.addEventListener('newTask', (data) => {
            if(data.lastEventId === (this.state.userData && this.state.userData._id)) {
                const curData = JSON.parse(data.data);
                this.setState({greenSnackText: curData.description, greenSnackOpen: true, taskCount: this.state.taskCount + 1});
            }
        });
    }

    sendMessage() {
        axios.get('http://localhost:9000/startEvent').then((res) => {
            console.log(res.data)
        })
    }

    screenChanger(newScreen) {
        this.setState({currentScreen: newScreen});
        if (newScreen === "shop") {
            var goodsList = [];
            axios.get('http://localhost:9000/getGoods').then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    goodsList.push({
                        _goodId: res.data[i]._id,
                        _goodName: res.data[i]._goodName,
                        _cost: res.data[i]._cost,
                        _remainder: res.data[i]._remainder,
                        _img: res.data[i]._img
                    })
                }
                this.setState({goods: goodsList})
                console.log("res", this.state.goods)
            })
        }
    }

    loadUserData() {
        const self = this;
        axios.post('http://localhost:9000/getUserInfo', null, {
            params: {
                login: 'Ivanov@mail.ru',
            }
        }).then((data) => {
            console.log(data);
            self.setState({userData: data.data[0]})
        });
    }



    closeGreenSnack() {
        this.setState({greenSnackOpen: false});
    }



    render() {
        return (
            <div>
                <Header headerTitle={this.state.currentScreen}/>
                <Snackbar open={this.state.greenSnackOpen} autoHideDuration={6000} onClose={() => {this.closeGreenSnack()}}>
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={() => {this.closeGreenSnack()}}
                        severity="success"
                    >
                        {this.state.greenSnackText}
                    </MuiAlert>
                </Snackbar>
                <LeftMenu
                    changeImage={() => {
                        this.changeImageState()
                    }}
                    imageId={this.state.imageId}
                    userId={this.state.userData && this.state.userData._id}
                    screenChanger={(newScreen) => {
                        this.screenChanger(newScreen)
                    }}/>
                <div className="App-mainBlock">
                    {this.getCurrentScreen()}
                </div>
                <div className="App-fab">
                    <Fab onClick={() => {
                        this.setState({isTaskDialogOpen: true})
                    }} color="secondary" aria-label="edit">
                        <EditIcon/>
                    </Fab>
                </div>
                <TaskDialog
                    isOpen={this.state.isTaskDialogOpen}
                    close={() => {
                        this.setState({isTaskDialogOpen: false})
                    }}/>
            </div>
        );
    }
}

export default App;
