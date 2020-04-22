const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { favTeam } = require('./favTeam.model');

const UserSchema = new Schema({
    username: {
        type: String, 
        required: true,
    }, 
    email: {
        type: String, 
        required: true, 
    },
    password: {
        type: String, 
        required: true
    }, 
    favTeam: {
        type: Schema.Types.ObjectId, 
        ref: "favTeam"
    }
})

module.exports = mongoose.model('users' , UserSchema);