const express = require('express');
const router = express.Router(); 
const {FavTeam, Coach, Player} = require('../models/user.model');
const mongoose = require('mongoose');


router.get('/players', async(req, res)=>{
    let players = await Player.find();

    res.send(players);
})

router.get('/coach', async(req, res)=>{
    let coaches = await Coach.find();

    res.send(coaches);
})

router.get('/', async(req, res)=>{
   await FavTeam.findOne({name: "Asante Kotoko"}).
   populate("players").
   populate("coach").
   exec((err, favteam)=>{
    if (err) throw err
    console.log("the coach is ", favteam);
    res.send(favteam)
   });
})



module.exports = router;
