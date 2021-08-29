
const mongoose = require('mongoose')

module.exports = mongoose => {

    const schema = mongoose.Schema({

        user_id: String,

        name: String,

        primary: String,
        secondary: String,
        text: String,
        emphasis: String,
        warning: String,
        negative: String,
        scale_text: Array,
        scale_secondary: Array,

        order: Number,
        updated: { type: Date, default: Date.now },

    })

    const Theme = mongoose.model('Theme', schema)
    return Theme
}