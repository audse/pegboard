
const mongoose = require("mongoose");

module.exports = mongoose => {

    let schema = mongoose.Schema({
        title: String,
        subtitle: String,
    })

    schema.method('toJSON', () => {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    const Test = mongoose.model('Test', schema)

    return Test
}