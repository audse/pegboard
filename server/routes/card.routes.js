
module.exports = app => {

    const Card = require('./../controllers/card.controller')

    const router = require('express').Router()

    router.post('/', Card.add)

    router.get('/:id', Card.find_by_id)
    router.put('/:id', Card.find_by_id_and_update)
    router.delete('/:id', Card.find_by_id_and_delete)

    router.get('/user/:user_id', Card.find_by_user)
    router.get('/user/:user_id/board/:board_id', Card.find_by_board)
    router.get('/user/:user_id/board/:board_id/list/:list_id', Card.find_by_list)

    app.use('/api/card', router)
}