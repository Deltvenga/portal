const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());

let clients = [];
function eventsHandler(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);
    const clientId = Date.now();
    res.write(`event: newUser\nid: ${clientId}\ndata: ${JSON.stringify({id: clientId})}\n\n`)
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient);
    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(c => c.id !== clientId);
    });
}

function sendDataToAll(data) {
    clients.forEach((c) => {
        c.res.write(`event: testMessage\nid: ${c.id}\ndata: ${JSON.stringify(data)}\n\n`)
    });
}

function sendDataToUser(userId, data) {
    clients.forEach((c) => {
        if(c.id === userId) {
            c.res.write(`event: testMessage\nid: ${userId}\ndata: ${JSON.stringify(data)}\n\n`)
        }
    });
}

function sendEventToUser(event, userId, data) {
    clients.forEach((c) => {
        if(c.id === userId) {
            c.res.write(`event: ${event}\nid: ${userId}\ndata: ${JSON.stringify(data)}\n\n`)
        }
    });
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Define endpoints
app.get('/events', eventsHandler);
app.get('/status', (req, res) => res.json({clients: clients.length}));

var Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:lazeradmin@cluster0.dkanu.mongodb.net/moneyKeeper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
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

let counter = 0;
app.get('/startEvent', (req, res) => {
    setInterval(() => {sendDataToAll({number: counter++})}, 1000);
});


const PORT = 9000;
app.listen(PORT, () => console.log("server started"));