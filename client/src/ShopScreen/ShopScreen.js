import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default class ShopScreen extends React.Component {
    
    constructor(props){
        super(props);
    }
    
    getGoods = (e) => {
        axios.get('http://localhost:9000/getGoods').then((res) => {
            console.log(res.data)
        })
    }
    
    render() {
        return (
            <div>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Button onClick={() => {this.getGoods()}} variant="contained">get goods</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}