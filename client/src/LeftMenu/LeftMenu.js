import React, {Component} from 'react';
import Slider from "@material-ui/core/Slider";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import './LeftMenu.css';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";


export class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
        this.openUserMenu.bind(this);
        this.handleClose.bind(this);
    }

    openUserMenu(target) {
        this.setState({anchorEl: target});
    }

    handleClose() {
        this.setState({anchorEl: null});
    }

    render() {
        return (
            <div className="App-LeftMenu">
                <MenuList id="menu-list-grow">
                    <Menu
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => {
                            this.handleClose()
                        }}
                    >
                        <MenuItem onClick={() => {
                            this.handleClose();
                            this.props.screenChanger('userProfile')
                        }}>Профиль</MenuItem>
                        <MenuItem onClick={() => {
                            this.handleClose()
                        }}>Выйти</MenuItem>
                    </Menu>
                    <MenuItem onClick={(target) => {
                        this.openUserMenu(target)
                    }}>
                        <Avatar
                            alt="Ivanov Ivan"
                            src={this.props.userId ? `http://localhost:9000/getAva?userId=${this.props.userId}&imageId=${this.props.imageId}` : ''}
                        />
                        <div className="App-LeftMenu__UserName">Ivanov Ivan</div>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        this.props.screenChanger('taskScreen')
                    }}>Задачи</MenuItem>
                    <MenuItem onClick={() => {
                        this.props.screenChanger('shop')
                    }}>Магазин</MenuItem>
                    <MenuItem onClick={() => {
                        this.props.screenChanger('usersList')
                    }}>Сотрудники</MenuItem>
                    <MenuItem onClick={() => {
                        this.props.screenChanger('stats')
                    }}>Статистика</MenuItem>
                    <MenuItem onClick={() => {
                        this.props.screenChanger('control')
                    }}>Управление</MenuItem>
                </MenuList>
            </div>
        );
    }
}

export default LeftMenu;
