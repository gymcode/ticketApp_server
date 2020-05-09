const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { User } = require('../models/user.model');

router.get('/', async(req, res)=>{
   await User.find().
   populate('favTeam').
   exec((err, data)=>{
    if (err) throw err
    data.map((details)=>{
      res.status(200).json({
          ok: true, 
          data: details, 
          error: null
      })
    })
   })
    
})

router.post('/', async(req, res)=>{
    let {username, email, password } = req.body;

     if(!username || !email ||!password){
         return res.status(400).json({ error:'Please fill all fields'})
     }
     if(password.length < 6){
         return res.status(400).json({ error:"Password should be more than 6 characters"})
     }
    //checking the database for exsiting emails
    let user = await User.findOne({email: email});
        if (user) {
            // return bad request 400
            return res.status(400).json({
                ok: false, 
                data: null, 
                error: "Email already Exists"
            });           
        } 
       
        // creating a new account using the database fields
        let newUser = new User({
            username: username, 
            email: email, 
            password: password, 
        })

        console.log(newUser);


        // encrypting the password
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;

       await newUser.save();

        // sending the data to the mobile app to be stored into async storage
        res.status(200).json({
            ok: true,
            data: user, 
            error:null
        })

});


router.patch('/:userId', async(req, res)=>{
    try {
        const updatedUser = await User.updateOne({ _id: req.params.userId}, { $set: {
            favTeam : req.body.favTeam
        }});
        res.send(updatedUser);
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;