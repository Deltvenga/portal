import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";


export class TaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverNumber: 0
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

    render() {
        return (
            <div>
                Тут будут задачи
                <br/>Серверный таймер: {this.state.serverNumber}
                <Button onClick={() => {this.subscribeToEvents()}} variant="contained">subscribe to events</Button>
                <Button onClick={() => {this.sendMessage()}} variant="contained">start spam</Button>
            </div>
        );
    }
}

export default TaskScreen;
