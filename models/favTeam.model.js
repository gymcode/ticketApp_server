const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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


module.exports = {
    Coach, 
    Player, 
    FavTeam
}