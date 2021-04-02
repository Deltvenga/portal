import React, {Component} from 'react';
import './App.css';
import LeftMenu from "./LeftMenu/LeftMenu";
import TaskScreen from "./TaskScreen/TaskScreen";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import TaskDialog from "./TaskScreen/TaskDialog/TaskDialog";
import ShopScreen from "./ShopScreen/ShopScreen";
import Profile from "./UserProfile/Profile";
import Header from "./Common/Header"
import Button from "@material-ui/core/Button";
import axios from "axios";
import FormData from 'form-data'
import UserList from "./UserList/UserList";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import ControlScreen from "./ControlScreen/ControlScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import Cookies from 'universal-cookie';
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greenSnackOpen: false,
            taskCount: 0,
            greenSnackText: '',
            serverNumber: 0,
            currentScreen: 'loginScreen', // taskScreen, userProfile, usersList, shop, ...
            isTaskDialogOpen: false,
            goods: [],
            userScore: 0,
            imageId: 0,
            userLogin: "",
            userName: "",
            userData: {},
            userId: "",
            userRole: "",
            isLoaded: false
        }
        this.cookies = new Cookies();
        this.state.userId = this.cookies.get('userId');
        this.state.userRole = this.cookies.get('userRole');
        this.screenChanger.bind(this);
        if (this.state.userId) {
            this.loadUserData(this.state.userId);
        } else {
            this.state.isLoaded = true;
            this.state.userData = {};
        }
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
                <ControlScreen/>

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
            if (data.lastEventId === (this.state.userData && this.state.userData._id)) {
                const curData = JSON.parse(data.data);
                this.setState({
                    greenSnackText: curData.description,
                    greenSnackOpen: true,
                    taskCount: this.state.taskCount + 1
                });
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

    getUserName(data) {
        if (data.name && data.surname) {
            return data.name + " " + data.surname[0] + "."
        }
    }


    loadUserData(userId) {
        const self = this;
        axios.post('http://localhost:9000/getUserInfo', null, {
            params: {
                userId: userId,
            }
        }).then((data) => {
            console.log(data);
            const newUserData = Object.assign({}, data.data[0]);
            self.setState({
                userData: newUserData,
                currentScreen: 'taskScreen',
                isLoaded: true,
                userName: this.getUserName(newUserData)
            });
        });
    }

    closeGreenSnack() {
        this.setState({greenSnackOpen: false});
    }

    getMainScreen() {
        return (
            <div style={{display:"flex"}}>
                <Snackbar open={this.state.greenSnackOpen} autoHideDuration={6000} onClose={() => {
                    this.closeGreenSnack()
                }}>
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={() => {
                            this.closeGreenSnack()
                        }}
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
                    }}
                    userName={this.state.userName}
                    userData={this.state.userData}/>
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
        )
    }

    render() {
        return (
            <div>
                <Backdrop className="test" open={!this.state.isLoaded}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {this.state.currentScreen === 'loginScreen' ? (
                    <LoginScreen goToMainScreen={(data) => {
                        this.setState({currentScreen: 'taskScreen', userData: data, userName: this.getUserName(data)});
                    }}/>
                ) : ""}
                {this.state.currentScreen !== 'loginScreen' ? (
                    this.getMainScreen()
                ) : ""}
            </div>
        );
    }
}

export default App;
