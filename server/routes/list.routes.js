
module.exports = app => {

    const List = require('./../controllers/list.controller')

    const router = require('express').Router()

    router.post('/', List.add)

    router.get('/:id', List.find_by_id)
    router.put('/:id', List.find_by_id_and_update)
    router.delete('/:id', List.find_by_id_and_delete)

    router.get('/board/:board_id', List.find_by_board)

    app.use('/api/list', router)
}