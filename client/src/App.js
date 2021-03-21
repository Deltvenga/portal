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

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverNumber: 0,
            currentScreen: 'taskScreen', // taskScreen, userProfile, usersList, shop, ...
            isTaskDialogOpen: false,
            goods: [],
            userScore: 5
        }
        this.screenChanger.bind(this);
    }

    getCurrentScreen() {
        if (this.state.currentScreen === 'taskScreen') {
            return (
                <TaskScreen/>
            );
        }
        if (this.state.currentScreen === 'userProfile') {
            return (
                <Profile/>
            );
        }
        if (this.state.currentScreen === 'usersList') {
            return (
                <div>usersList</div>
            );
        }
        if (this.state.currentScreen === 'shop') {
            return (
                <ShopScreen
                    goods={this.state.goods}
                    userScore={this.state.userScore}/>
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
                </div>

            );
        }
    }

    subscribeToEvents() {
        const events = new EventSource('http://localhost:9000/events');
        events.addEventListener('testMessage', (data) => {
            this.setState({serverNumber: JSON.parse(data.data).number});
        })
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
                        _remainder: res.data[i]._remainder
                    })
                }
                this.setState({goods: goodsList})
                console.log("res", this.state.goods)
            })
        }
    }

    render() {
        return (
            <div>
                <Header headerTitle={this.state.currentScreen}/>
                <LeftMenu screenChanger={(newScreen) => {
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
