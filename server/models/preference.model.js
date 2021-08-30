
const mongoose = require('mongoose')

module.exports = mongoose => {

    const schema = mongoose.Schema({

        user_id: String,

        theme_id: String,

    })

    const Preference = mongoose.model('Preference', schema)
    return Preference
}