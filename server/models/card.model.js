
const mongoose = require('mongoose')

module.exports = mongoose => {

    const schema = mongoose.Schema({

        // Info
        user_id: String,
        board_id: String,
        list_id: String,

        // Content
        display: String,
        name: String,
        content: String,

        date_due: Date,
        date_todo: Date,

        // Metadata
        order: Number,
        date_created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },

    })

    const Card = mongoose.model('Card', schema)
    return Card
}