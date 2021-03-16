import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import './Profile.css';


export default class Profile extends Component {
    constructor(props) {
        super(props);
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
            </div>

        );
    }
}