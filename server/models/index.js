

const db_config = require('./../../db.config.js')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = db_config.db_url

db.board_model = require('./board.model')(mongoose)
db.list_model = require('./list.model')(mongoose)
db.card_model = require('./card.model')(mongoose)
db.theme_model = require('./theme.model')(mongoose)
db.preference_model = require('./preference.model')(mongoose)

module.exports = db