const express = require('express');
const app = express();
const PORT = 4000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//imports
const Register = require('./routes/register');
const Login = require('./routes/login');
const Forgot = require('./routes/forgot');

//use imports
app.use('/register', Register);
app.use('/login', Login);
app.use('/forgot', Forgot);


//database connection
const mongoose = require('mongoose');
const DBUrl = 'mongodb://localhost:27017/TicketAppDb'
mongoose.connect(DBUrl, {useNewUrlParser: true, useUnifiedTopology: true}, err =>{
    if (err) throw err
    console.log("database connection made successfully")
})
require('./models/user.model');

app.listen(PORT, (err)=>{
    if (err) throw err
    console.log("Server Connection made successsfully")
})