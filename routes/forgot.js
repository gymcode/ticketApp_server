require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')
const Nodemailer = require('nodemailer');

router.get('/', (req, res)=>{
//    const user = {
//        id: 1, 
//        email: "dasda@gmail.com", 
//        name: 'dasdad'
//    }

//    //forming the token 
//    const token = jwt.sign(user, secretKey);
//    res.json({
//        token: token
//    });
//    console.log(token)
// });

// router.get('/verify/:token', (req, res)=>{
//     try {
//         const tokenData = jwt.verify(req.params.token, secretKey)
//         return res.json({
//             error: false, 
//             data: tokenData
//         })
//     } catch (error) {
//         return res.json({
//             error: true, 
//             data: error
//         })
//     }
})

router.post('/', async(req, res)=>{

    //checking whether the user email exist 
    let user = await User.findOne({email: req.body.email}); 
    
    if (!user) {
        //returning an error 
        return res.status(400).json({
            ok: false, 
            data: null, 
            error: "Email does not exit"
        });
    }

    //encrypting the data to be sent to the server
        //getting the secret key
       let User_secret = "ticketApp"
       
       let payload = {
           id: user.id, 
           email: user.email
       }

         //    generating token
       let token = jwt.sign(payload, User_secret)
       res.status(200).json({
           token
       })

        // token generated now to sending the mail
        const Transport = Nodemailer.createTransport({
            service: "SendGrid",
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
            tls: {
              rejectUnauthorized: false,
            }
          });

        // adding the mail options
        let MailOptions = {
            to: user.email, 
            from: "Inkognito<noreply@inkognito.com>",
            subject: "Password reset for ticketApp", 
            text: "You are receiving this because you have requested thereset of the password for your ticketApp account.\n" +
                    "Please click on the link below to complete the process\n" +
                    " http://" + req.hostname + "/reset/" + token + '\n' +
                    "if you did not request this please ignore this message and your password would remain unchanged"
        }

        await Transport.sendMail(MailOptions);
          let result = await Transport.verify();
          if (!result) throw new Error(err);

})


module.exports = router