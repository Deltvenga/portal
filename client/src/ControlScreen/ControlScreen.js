import React from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from 'axios';

export default class ControlScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userName: "",
            userPassword: "",
            userEmail: "",
            role: 0
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this)
    }
    
    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }  
    
    handleChangeRole = (e) => {
        this.setState({role: e.target.value});
    }

    createUser = (e) => {
        console.log(this.state.userName, this.state.userEmail, this.state.userPassword, this.state.role);
        axios.post('http://localhost:9000/createUser', null, {
            params: {
                userName: this.state.userName,
                userPassword: this.state.userPassword,
                userEmail: this.state.userEmail,
                role: this.state.role
            }
        }).then()
    }
    
    render() {
        return (
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography>Добавить сотрудника</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            <TextField 
                                id="filled-basic" 
                                label="Имя" variant="filled" 
                                value={this.state.userName} 
                                onChange={this.onInputChange}
                                name="userName"/><br/>
                            <TextField 
                                id="filled-basic" 
                                label="Пароль" 
                                variant="filled"
                                value={this.state.userPassword} 
                                onChange={this.onInputChange}
                                name="userPassword"/><br/>
                            <TextField 
                                id="filled-basic" 
                                label="E-mail" 
                                variant="filled"
                                value={this.state.userEmail} 
                                onChange={this.onInputChange}
                                name="userEmail"/>
                            <InputLabel id="access-level">Type</InputLabel>
                            <Select onChange={this.handleChangeRole}
                                labelId="access-level"
                                value={this.state.role}
                            >
                                <MenuItem value={'user'}>Сотрудник</MenuItem>
                                <MenuItem value={'admin'}>Администратор</MenuItem>
                            </Select>
                            <Button onClick={() => {this.createUser()}}>
                                Добавить
                            </Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Выдать ачивку</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Процесс выдачи ачивки...
                        </Typography>
                    </AccordionDetails>
                </Accordion>

            </div>
        )
    }
}