const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require("multer");
const Task = require('./models/Task');
const User = require('./models/User');
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
        c.res.write(`event: testMessage\nid: ${c.id}\ndata: ${JSON.stringify(data)}\n\n`);
    });
}

function sendDataToUser(userId, data) {
    clients.forEach((c) => {
        if (c.id === userId) {
            c.res.write(`event: testMessage\nid: ${userId}\ndata: ${JSON.stringify(data)}\n\n`)
        }
    });
}

function sendEventToUser(event, userId, data) {
    clients.forEach((c) => {
        console.log(c);
        c.res.write(`event: ${event}\nid: ${userId}\ndata: ${JSON.stringify(data)}\n\n`)
    });
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Define endpoints
app.get('/events', eventsHandler);
app.get('/status', (req, res) => res.json({clients: clients.length}));

var Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:lazeradmin@cluster0.dkanu.mongodb.net/ratPortal', {
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
    GoodsModel.find({}, function (err, result) {
        res.send(result)
    });
});

let counter = 0;
app.get('/startEvent', (req, res) => {
    setInterval(() => {
        sendDataToAll({number: counter++})
    }, 1000);
});


const handleError = (err, res) => {
    res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
};

const upload = multer({
    dest: "/files"
});

let lastFileName = "";
app.post("/upload",
    upload.single("file"),
    (req, res) => {
        const tempPath = req.file.path;
        const targetFileTypeTemp = req.file.originalname.split('.');
        const targetFileType = targetFileTypeTemp[targetFileTypeTemp.length - 1];
        const targetName = req.body.userId + "." + targetFileType;
        const targetPath = path.join(__dirname, "./uploads/" + targetName);
        lastFileName = req.file.originalname;
        const allowedFormats = ['.png', '.jpg', '.jpeg', '.gif', '.tiff'];
        if (allowedFormats.indexOf(path.extname(req.file.originalname).toLowerCase()) !== -1) {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Not allowed format!");
            });
        }
    }
);

app.post('/newTask', async (req, res) => {
    const newTask = new Task({
        currentUserId: req.query.targetUserId,
        title: req.query.title,
        description: req.query.description,
        ownerId: req.query.currentUserId,
        endDate: req.query.endDate,
        currentState: 0
    });
    await newTask.save().then((data) => {
        sendEventToUser("newTask", req.query.targetUserId, {description: "Тебе задача!"});
        res.send(data);
    });
});

app.post('/getTasks', (req, res) => {
    Task.find({currentUserId: req.query.userId}).then(result => {
        res.send(result);
    });
});


app.get("/getAva", (req, res) => {
    fs.readdirSync(path.join(__dirname, `./uploads`)).forEach(file => {
        if (file.split(".")[0] === req.query.userId) {
            res.sendFile(path.join(__dirname, `./uploads/`, file));
            return null;
        } else {
            res.send(undefined);
        }
    });
});

app.post('/writeOffCheese', (req, res) => {
    User.updateOne({_id: mongoose.Types.ObjectId(req.query._id)}, {
        score: req.query.cost
    }, function(err, result){
        console.log(err)
    })
    
    GoodsModel.updateOne({_id: mongoose.Types.ObjectId(req.query._goodId)}, {
        _remainder: req.query.remainder
    }, function(err, result){
        console.log(err)
    })
});

app.post('/createUser', (req, res) => {
    User.create({
        name: req.query.userName,
        login: req.query.userEmail,
        score: 0,
        level: 1,
        reachScore: 10,
        role: req.query.role,
        password: req.query.userPassword
    }, function(err, result){
        console.log(err)
        res.send({success:true});
    });
});

app.post('/signIn', (req, res) => {
    User.find({
        login: req.query.login,
        password: req.query.password
    }, function(err, result){
        console.log(result);
        res.send(result)
    })
})

app.use('/', require('./routes/Users'));
const PORT = 9000;
app.listen(PORT, () => console.log("server started"));
