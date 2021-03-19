import React, {Component} from 'react';
import {Avatar} from "@material-ui/core";
import './Profile.css';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Header from '../Common/Header'
import Achieves from './Achieves';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
        this.loadUserData();
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

    setUserData(userData) {
        if (userData) {
            const keys = Object.keys(this.state.userData);
            const res = [];
            keys.forEach((key, index) => {
                res.push(
                    <div key={index}>
                        {userData[key]};
                    </div>
                );
            });
            return res;
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div className='App-ProfileContainer'>
                    <div className='App-AvaContainer'>
                        <Paper elevation={3}>
                            <span>Это вы</span>
                            <Avatar
                                alt="Ivanov Ivan"
                                src="/avas/1.jpg"
                                className="App-ProfileAva"
                                variant="square"
                            />
                            <span>{this.state.userData ? this.state.userData.login: null}</span>
                            <div>Your level: {this.state.userData ? this.state.userData.level: null}</div>
                            <div>Your balance: {this.state.userData ? this.state.userData.score: null}</div>
                            <div>To next level: {this.state.userData ? this.state.userData.reachScore: null}</div>
                        </Paper>
                    </div>
                </div>
                <Achieves/>
            </div>
        );
    }
}