const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavTeam = mongoose.model('favteams', 
    new Schema({
        name: {
            type: String, 
            required: true
        }, 
        players: [
                {
                type: Schema.Types.ObjectId,
                ref: "players"
             }
        ],
        coach: {
            type: Schema.Types.ObjectId, 
            ref: "coaches"
        }
    })
)

const User = mongoose.model('users' , new Schema({
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
        ref: "favteams"
    }
}, {timestamps:true}))

const Coach = mongoose.model('coaches',
    new Schema({
        name: {
            type: String, 
            required: true, 
        }, 
        age: {
            type: Number, 
            required: true
        }
    })
)

const Player = mongoose.model('players', 
    new Schema({
        name: {
            type: String, 
            required: true
        }, 
        number: {
            type: Number, 
            required: true
        }
    })
)




module.exports = {
    User,
    Coach, 
    Player, 
    FavTeam
}
