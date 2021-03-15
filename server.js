const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

app.use(cors());

var Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:lazeradmin@cluster0.dkanu.mongodb.net/moneyKeeper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
const GoodsModel = mongoose.model('goods', new Schema({
    _goodName: String,
    _cost: Number,
    _remainder: Number
}));

app.get('/getGoods', (req, res) => {
    GoodsModel.find({}, function(err, result){
        console.log(result)
    });
});

const PORT = 9000;
app.listen(PORT, () => console.log("server started"));