
module.exports = app => {

    const Preference = require('./../controllers/preference.controller')

    const router = require('express').Router()

    router.post('/', Preference.add)

    router.get('/:user_id', Preference.find_by_user_id)
    router.put('/:user_id', Preference.find_by_user_id_and_update)

    app.use('/api/preference', router)

}