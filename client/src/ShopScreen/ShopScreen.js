import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import './ShopScreen.css';
import axios from 'axios';

export default class ShopScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    
    state = {
        isErrorDialogOpen: false,
        altDialog: "",
        altDialogTitle: ""
    }
//    getGoods = (e) => {
//        axios.get('http://localhost:9000/getGoods').then((res) => {
//            console.log(res.data)
//        })
//    }

    checkScore = (e, goodId, remainder) => {
        if (this.props.userData.score < e)
        {
            console.log("err");
            this.setState({isErrorDialogOpen: true, altDialog: "Бомж", altDialogTitle: "Ошибка"})
        }
        else {
            this.setState({isErrorDialogOpen: true, altDialog: "Красава, заберешь у главного", altDialogTitle: "Молодец"});
            axios.post('http://localhost:9000/writeOffCheese', null, {
                params: {
                    cost: this.props.userData.score - e,
                    _id: this.props.userData._id,
                    _goodId: goodId, 
                    remainder: remainder - 1
                }
            }).then((data) => console.log(data))
        }
    }
    
    handleClose() {
        this.setState({isErrorDialogOpen: false})
    };

    
    render() {
        return (
            <div className="shopScreen">
                {this.props.goods.map((item) => {
                    return (
                        <Card className="shopScreen_grid_item_card">
                            <CardContent>
                                <img width="100" height="100" src={item._img}></img>
                            </CardContent>   
                            <CardContent className="shopScreen_grid_item_content">
                                <Typography variant="h6" gutterBottom noWrap>{item._goodName}</Typography> 
                                <Typography noWrap>
                                    {item._cost}
                                    <img src="/avas/cheese.svg"></img>
                                </Typography>
                                {item._remainder === 0 ? ( 
                                    <Typography noWrap>Нет в наличии</Typography>):""}
                                {item._remainder > 0 ? (
                                    <Typography noWrap>{item._remainder} шт.</Typography>):""}
                                
                                {item._remainder > 0 ? (
                                    <Button size="small" color="primary" onClick={() => {this.checkScore(item._cost, item._goodId, item._remainder)}}>Купить</Button>):""}
                            </CardContent>
                        </Card>         
                    )
                })}
                <Dialog open={this.state.isErrorDialogOpen} onClose={() => {this.handleClose()}} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{this.state.altDialogTitle}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                                    {this.state.altDialog}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" color="secondary" onClick={() => {
                            this.handleClose()
                        }}>
                                Ок
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
