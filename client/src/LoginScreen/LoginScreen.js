import React, {Component} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './LoginScreen.css';
import { Cookies } from 'react-cookie';

export default class LoginScreen extends Component {
    
    constructor(props){
        super(props);
        this.cookies = new Cookies();
        this.state = {
            login: "",
            password: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    signInFunction = (e) => {
        axios.post('http://localhost:9000/signIn', null, {
            params: {
                login: this.state.login,
                password: this.state.password
            }
        }).then((data) => {
            console.log(data.data);
            if (data.data.length !== 0){
                this.cookies.set('userId', data.data[0]._id, { path: '/' });
                this.cookies.set('userRole', data.data[0].role, { path: '/' });
                this.props.goToMainScreen(data.data[0]);
            }
        })        
    }
    
    render() {
        return (
            <div className="loginScreen-block">
                <div className="loginScreen-block_form">
                    <div>
                        <TextField 
                            id="outlined-basic" 
                            label="E-mail" 
                            name="login" 
                            variant="outlined" 
                            onChange={this.onInputChange}
                            value={this.state.login}>
                        </TextField>
                    </div>
                    <div>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            name="password"
                            onChange={this.onInputChange}
                            value={this.state.password}
                        />
                    </div>
                    
                    <div><Button variant="contained" color="primary" onClick={() => {this.signInFunction()}}>Войти</Button></div>
                </div>
            </div>
        )
    }
}