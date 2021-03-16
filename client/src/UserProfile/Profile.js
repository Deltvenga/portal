import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import './Profile.css';
import axios from "axios";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
        this.loadUserData();
    }
    loadUserData() {
        var self = this;
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
            var keys = Object.keys(this.state.userData);
            var res = [];
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
            <div className='App-ProfileContainer'>
                <div>
                    <Avatar alt="Ivanov Ivan" src="/avas/1.jpg"/>
                    <span>userLogin</span>
                </div>
                <div>Your level: 35</div>
                <div>Your balance: 35 cheese</div>
                <div>To next level: 2 cheese</div>
                <div>Achievements: </div>
                {this.setUserData(this.state.userData)}
            </div>
        );
    }
}