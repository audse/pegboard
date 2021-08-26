
const db = require('./../models/index.js')
const Board = db.board_model

exports.add = ( request, response ) => {

    const new_board = new Board ({
        user_id: request.body.user_id,

        name: request.body.name,
        description: request.body.description,

        theme_id: request.body.theme_id
    })

    new_board.save( new_board ).then( data => {
        response.send(data)
    }).catch( e => {
        response.status(500).send({
            message: 'An error occured while saving this board.'
        })
    })
}

exports.find_by_id = ( request, response ) => {
    
    const id = request.params.id

    Board.findById( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No boards could be found for the provided ID.'
        })

        else response.send(data)

    }).catch( e => {
        response.status(500).send({
            message: 'There was a problem retrieving boards.'
        })
    })
}

exports.find_by_user = ( request, response ) => {
    
    const request_user_id = request.params.user_id

    Board.find( { user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No boards could be found for the provided ID.'
        })

        else response.send(data)

    }).catch( e => {
        response.status(500).send({
            message: 'There was a problem retrieving boards.'
        })
    })
}

exports.find_by_id_and_update = ( request, response ) => {

    if ( !request.body ) return response.status(400).send({
        message: 'Data cannot be empty.'
    })

    const id = request.params.id

    Board.findByIdAndUpdate( id, request.body, { useFindAndModify: false } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided board.'
        })

        else response.send({
            message: 'The board was successfully updated.'
        })
        
    }).catch( e => {
        response.status(500).send({
            message: 'There was a problem retrieving boards.'
        })
    })

}