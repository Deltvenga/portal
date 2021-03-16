const express = require('express');
const router = express.Router();
const user = require('../models/User');
const mongoose = require('mongoose');

let users = null;
let currentUser = null;
router.get('/getAllUsers', (req, res) => {
    user.find({}).then(result => {
        res.send(result);
        users = result;
        console.log(result);
    });
});

router.post('/getUserInfo',(req, res) => {
    user.find({login: req.query.login}).then (result => {
        res.send(result);
        console.log(result);
    });
});

router.post('/loginUser',(req, res) => {
    console.log(req.query);
    user.find({email: req.query.email}).then (result => {
        console.log(result);
        if (result[0].password !== req.query.password) {
            res.send({error: "Wrong password"});
        } else {
            res.send(result[0]);
        }
    });
});

router.post('/createUser',async (req, res) => {
    const newUser = new user({
        name: req.query.userName,
        email: req.query.email,
        password: req.query.userPassword,
        emailConfirmed: false
    });
    console.log(req.query);
    await newUser.save().then((data) => {
        console.log(data);
        res.send(data);
    });
});

router.post('/updateScore', async (req, res) => {
    let userId = req.query.login;
    let objectId = mongoose.Types.ObjectId(userId);
    user.updateOne({
        _id: objectId
    }, {
        reachScore: req.query.reachScore
    }).then(result => {
        console.log(result);
        res.send('Mark update');
    });
});

module.exports = router;