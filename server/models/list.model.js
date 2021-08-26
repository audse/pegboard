
const mongoose = require('mongoose')

module.exports = mongoose => {

    const schema = mongoose.Schema({

        user_id: String,
        board_id: String,

        name: String,
        description: String,

        updated: { type: Date, default: Date.now },

    })

    const List = mongoose.model('List', schema)
    return List

}