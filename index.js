const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; 
// const User = require('./models/user.model')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//imports
const Register = require('./routes/register');
const Login = require('./routes/login');
const Forgot = require('./routes/forgot');
const FavTeam = require('./routes/favTeam');

//use imports
app.use('/register', Register);
app.use('/login', Login);
app.use('/forgot', Forgot);
app.use('/favteam', FavTeam); 

//database connection
const mongoose = require('mongoose');
const DBUrl = process.env.MONGODB_URI 
mongoose.connect( DBUrl, {useNewUrlParser: true, useUnifiedTopology: true}, err =>{
    if (err) throw err
    console.log("database connection made successfully")
})
require('./models/user.model');

app.listen(PORT, (err)=>{
    
    if (err) throw err
    console.log("Server Connection made successsfully")
})