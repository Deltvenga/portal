import React, {Component} from 'react';
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import './LeftMenu.css';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import { Cookies } from 'react-cookie';

export class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            userRole: ""
        }
        this.openUserMenu.bind(this);
        this.handleClose.bind(this);
        this.cookies = new Cookies();
        this.state.userRole = this.cookies.get('userRole');
    }

    openUserMenu(target) {
        this.setState({anchorEl: target});
    }

    handleClose() {
        this.setState({anchorEl: null});
    }
    
    deAuth() {
        this.cookies.remove('userId');
        this.cookies.remove('userRole');
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
                            this.deAuth()
                        }}>Выйти</MenuItem>
                    </Menu>
                    <MenuItem onClick={(target) => {
                        this.openUserMenu(target)
                    }}>
                        <Avatar
                            alt={this.props.userData.name}
                            src={this.props.userId ? `http://localhost:9000/getAva?userId=${this.props.userId}&imageId=${this.props.imageId}` : ''}
                        />
                        <div className="App-LeftMenu__UserName">{this.props.userName}</div>
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
                    {this.state.userRole === 'admin' ? (
                        <MenuItem onClick={() => {
                            this.props.screenChanger('control')
                        }}>Управление</MenuItem>    
                    ):""}
                </MenuList>
            </div>
        );
    }
}

export default LeftMenu;
