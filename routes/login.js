const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');


router.post('/', async(req, res)=>{

    // checking the user exists
    let user = await User.findOne({email: req.body.email});
     if (!user) {
         return res.status(400).json({
             ok: false,
             data: null, 
             error: "Email does not exists"
         });
     }

     let isSame = await bcrypt.compare(req.body.password, user.password);
     if (!isSame) {
         //bad request
         return res.status(400).json({
             ok: false, 
             data: null, 
             error: "Passwords do not match account"
         });
         
     }

     res.status(200).json({
         ok: true,
         data: user, 
         error: null
     });

});

module.exports = router;

