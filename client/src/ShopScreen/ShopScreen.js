import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './ShopScreen.css'
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import Header from '../Common/Header'
export default class ShopScreen extends React.Component {

    constructor(props) {
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
                <Header/>
                {this.props.goods.map((item) => {
                    return (
                        <Paper className="shopScreen_paper" elevation={3}>
                            <Grid className="shopScreen_grid" container wrap="nowrap" spacing={2}>
                                <Grid className="shopScreen_grid_item" item>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <div className="App-TaskScreen-ListItem__taskScreen">
                                                <Typography noWrap>{item._goodName}</Typography>
                                            </div>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Купить</Button>
                                        </CardActions>
                                    </Card>
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