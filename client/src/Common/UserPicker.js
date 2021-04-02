import React, {Component} from 'react';

// import "./TaskScreen.css"
import {Avatar} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";



export class TaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersListData: [],
            isAutoCompleteLoading: true,
            isAutoCompleteOpened: false,
            curUser: "",
        }

    }

    getName(data, isSimple) {
        if (data.name) {
            if(!data.surname) {
                return data.name;
            }
            if(isSimple) {
                return data.name + " " + data.surname[0] + ".";
            } else {
                return data.name + " " + data.surname;
            }
        }
    }


    curUserChanged(event, data) {
        this.setState({curUser: data});
        this.props.curUserChanged(data);
    }


    isAutocompleteOpened() {
        this.setState({isAutoCompleteOpened: true});
        axios.get('http://localhost:9000/getAllUsers', null).then((data) => {
            this.setState({usersListData: data.data, isAutoCompleteLoading: false});
        });
    }

    render() {
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.usersListData}
                    loading={true}
                    onOpen={() => {this.isAutocompleteOpened()}}
                    getOptionLabel={(opt) => this.getName(opt, true) }
                    onChange={(event,data) => {this.curUserChanged(event, data)}}
                    renderOption={(option) => (
                        <React.Fragment>
                            <div className="App-TaskScreen-TaskDialog__UserOption">
                                <Avatar
                                    src={option._id ? `http://localhost:9000/getAva?userId=${option._id}&imageId=${this.props.imageId}` : ''} />
                                <div className="App-TaskScreen-TaskDialog__UserOption-name">{this.getName(option)}</div>
                            </div>
                        </React.Fragment>
                    )}
                    style={{ width: "auto" }}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Исполнитель"
                            variant="outlined"
                        />}
                />
            </div>
        );
    }
}

export default TaskScreen;
