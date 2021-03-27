import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import './Profile.css';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Achieves from './Achieves';
import Button from "@material-ui/core/Button";
import {IconButton} from "@material-ui/core";
import FormData from "form-data";


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: null
        }
//        this.loadUserData();
    }

//    loadUserData() {
//        const self = this;
//        axios.post('http://localhost:9000/getUserInfo', null, {
//            params: {
//                login: 'Ivanov@mail.ru',
//            }
//        }).then((data) => {
//            console.log(data);
//            self.setState({userData: data.data[0]})
//        });
//    }

    setUserData(userData) {
        if (userData) {
            const keys = Object.keys(this.props.userData);
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

    processImage(e) {
        let data = new FormData();
        data.append('file', e.target.files[0], e.target.files[0].name);
        data.append('userId', this.props.userData._id);
        axios.post("http://localhost:9000/upload", data, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
        })
            .then((response) => {
                this.props.changeImage();
            }).catch((error) => {
        });
    }

    render() {
        return (
            <div>
                <Paper elevation={3}>
                    <div className='App-AvaContainer'>
                        <input
                            onChange={(e) => {this.processImage(e)}}
                            className="App-AvainputBlock"
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                        />
                        <label htmlFor="icon-button-file">
                            <IconButton aria-label="upload picture" component="span">
                                <Avatar
                                    className="App-ProfileAva"
                                    alt={this.props.userData.name}
                                    src={this.props.userData._id ? `http://localhost:9000/getAva?userId=${this.props.userData._id}&imageId=${this.props.imageId}` : ''}
                                />
                            </IconButton>
                        </label>
                        <div className='App-AvaInfo'>
                            <span> E-mail: {this.props.userData.login}</span>
                            <p>Уровень: {this.props.userData.level}</p>
                            <p>Баланс: {this.props.userData.score}<img width="20" src="/avas/cheese.svg"></img></p>
                            <p>До следующего уровня: {this.props.userData.reachScore}<img width="20" src="/avas/cheese.svg"></img></p>
                        </div>
                    </div>
                </Paper>
                <Achieves/>
            </div>
        );
    }
}