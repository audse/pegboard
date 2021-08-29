
module.exports = app => {

    const Theme = require('./../controllers/theme.controller')

    const router = require('express').Router()

    router.post('/', Theme.add)

    router.get('/:id', Theme.find_by_id)
    router.put('/:id', Theme.find_by_id_and_update)
    router.delete('/:id', Theme.find_by_id_and_delete)

    router.get('/user/:user_id', Theme.find_by_user)

    app.use('/api/theme', router)

}