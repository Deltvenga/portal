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

    render() {
        return (
            <div id='root'>
                <Header/>
            </div>
        );
    }
}