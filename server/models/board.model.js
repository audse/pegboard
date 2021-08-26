
const mongoose = require('mongoose')

module.exports = mongoose => {

    const schema = mongoose.Schema({

        user_id: String,

        name: String,
        description: String,

        theme_id: String,

        updated: { type: Date, default: Date.now },

    })

    const Board = mongoose.model('Board', schema)
    return Board
}