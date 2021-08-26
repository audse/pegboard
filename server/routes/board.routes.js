
module.exports = app => {

    const Board = require('./../controllers/board.controller')

    const router = require('express').Router()

    router.post('/', Board.add)

    router.get('/:id', Board.find_by_id)
    router.put('/:id', Board.find_by_id_and_update)

    router.get('/user/:user_id', Board.find_by_user)

    app.use('/api/board', router)

}