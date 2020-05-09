const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/user.model');


router.post('/', async(req, res)=>{
    let {email, password } = req.body

    if(!email || !password){
        return  res.status(400).json({ error:'Please fill all fields'})
    }
    // checking the user exists
    let user = await User.findOne({email: email});
     if (!user) {
         return res.status(400).json({
             ok: false,
             data: null, 
             error: "Email does not exists"
         });
     }

     let isSame = await bcrypt.compare(password, user.password);
     if (!isSame) {
         //bad request
         return res.status(400).json({
             ok: false, 
             data: null, 
             error: "Password does not match account"
         });
         
     }

     res.status(200).json({
         ok: true,
         data: user, 
         error: null
     });
    

});

module.exports = router;

