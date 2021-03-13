import React, { Component } from 'react';
import './App.css';
import LeftMenu from "./LeftMenu/LeftMenu";
import TaskScreen from "./TaskScreen/TaskScreen";
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import TaskDialog from "./TaskScreen/TaskDialog/TaskDialog";


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'taskScreen', // taskScreen, userProfile, usersList, shop, ...
            isTaskDialogOpen: false
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
                <div className="App-fab">
                    <Fab onClick={() => {this.setState({isTaskDialogOpen: true})}} color="secondary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </div>
                <TaskDialog
                    isOpen={this.state.isTaskDialogOpen}
                    close={() => {this.setState({isTaskDialogOpen: false})}}/>
            </div>
        );
    }
}

export default App;
