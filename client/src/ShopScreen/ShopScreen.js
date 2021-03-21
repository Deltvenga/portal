import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import './ShopScreen.css';

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Header from '../Common/Header'
export default class ShopScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        anchorEl: null,
    }
//    getGoods = (e) => {
//        axios.get('http://localhost:9000/getGoods').then((res) => {
//            console.log(res.data)
//        })
//    }

    checkScore = (e) => {
        if (this.props.userScore < e)
            console.log("err")
    }
    
    handleClose = () => {
        this.setState({anchorEl: null});
    };

    
    render() {
        return (
            <div className="shopScreen">
                <Header/>
                {this.props.goods.map((item) => {
                    return (
                        <Grid className="shopScreen_grid" container wrap="nowrap" spacing={2}>
                            <Grid className="shopScreen_grid_item" item>
                                <Card>
                                    <CardContent>
                                        <Typography noWrap>{item._goodName}</Typography> 
                                        <Typography noWrap>{item._cost}</Typography>
                                        <Typography noWrap>{item._remainder}</Typography>
                                        <Button size="small" onClick={() => {this.checkScore(item._cost)}}>Купить</Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        )
    }
}