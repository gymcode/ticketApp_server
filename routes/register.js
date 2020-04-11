const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', async(req, res)=>{
    let {username, email, password } = req.body;

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
            password: password
        })


        // encrypting the password
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;

       const users =  await newUser.save();

        // sending the data to the mobile app to be stored into async storage
        res.status(200).json({
            ok: true,
            data: user, 
            error:null
        })

})
module.exports = router;