
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
        console.log(e)
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
        console.log(e)
        response.status(500).send({
            message: 'There was a problem retrieving boards.'
        })
    })
}

exports.find_by_user = ( request, response ) => {
    
    const request_user_id = request.params.user_id

    if ( !request_user_id ) response.status(404).send({
        message: 'The requested user could not be found.'
    })

    Board.find( { user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No boards could be found for the provided ID.'
        })

        else response.send(data)

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem retrieving boards.'
        })
    })
}

exports.find_by_id_and_update = ( request, response ) => {

    if ( !request.body ) return response.status(404).send({
        message: 'Data cannot be empty.'
    })

    const id = request.params.id

    let request_body = {}

    if ( request.body.name ) request_body.name = request.body.name
    if ( request.body.description ) request_body.description = request.body.description
    if ( request.body.order ) request_body.order = request.body.order
    
    request_body.updated = Date.now()

    Board.findByIdAndUpdate( id, { $set: request_body }, { useFindAndModify: false, new: true } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided board.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: `There was a problem retrieving the board.`,
        })
    })

}

exports.find_by_id_and_delete = ( request, response ) => {

    const id = request.params.id

    Board.findByIdAndRemove( id ).then( data => {
        if ( !data ) response.status(404).send({
            message: 'The requested board could not be found.'
        })

        else response.send({
            message: 'The board was successfully deleted.'
        })
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem deleting the board.'
        })
    })
}