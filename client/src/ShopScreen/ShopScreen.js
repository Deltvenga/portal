import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './ShopScreen.css'
export default class ShopScreen extends React.Component {
    
    constructor(props){
        super(props);
    }
    
//    getGoods = (e) => {
//        axios.get('http://localhost:9000/getGoods').then((res) => {
//            console.log(res.data)
//        })
//    }
//                    <Button variant="contained">get goods</Button>
    render() {
        return (
            <div className="shopScreen">
            <div className="testDiv">dgdga</div>
                {this.props.goods.map((item) => {
                    return (
                        <Paper className="shopScreen_paper" elevation={3}>
                        <Grid className="shopScreen_grid" container wrap="nowrap" spacing={2}>
                            <Grid className="shopScreen_grid_item" item>
                                <Typography noWrap>{item._goodName}</Typography>
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography noWrap>{item._cost}</Typography>
                            </Grid>
                        </Grid></Paper>
                    )
                })}
            </div>
        )
    }
}