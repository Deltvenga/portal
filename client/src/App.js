import React, { Component } from 'react';
import './App.css';
import LeftMenu from "./LeftMenu/LeftMenu";
import TaskScreen from "./TaskScreen/TaskScreen";


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'taskScreen' // taskScreen, userProfile, usersList, shop, ...
        }
        this.screenChanger.bind(this);
    }

    getCurrentScreen() {
        if(this.state.currentScreen === 'taskScreen') {
            return (
                <TaskScreen/>
            );
        }
        if(this.state.currentScreen === 'userProfile') {
            return (
                <div>userProfile</div>
            );
        }
        if(this.state.currentScreen === 'usersList') {
            return (
                <div>usersList</div>
            );
        }
        if(this.state.currentScreen === 'shop') {
            return (
                <div>shop</div>
            );
        }
        if(this.state.currentScreen === 'stats') {
            return (
                <div>stats</div>
            );
        }
    }

    screenChanger(newScreen) {
        this.setState({currentScreen: newScreen});
    }

    render() {
        return (
            <div>
                <LeftMenu screenChanger={(newScreen) => {this.screenChanger(newScreen)}} />
                <div className="App-mainBlock">
                    {this.getCurrentScreen()}
                </div>
            </div>
        );
    }
}

export default App;
