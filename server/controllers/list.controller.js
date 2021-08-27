
const db = require('./../models/index')
const List = db.list_model

exports.add = ( request, response ) => {

    const new_list = new List ({

        user_id: request.body.user_id,
        board_id: request.body.board_id,

        name: request.body.name,
        description: request.body.description,

    })

    new_list.save( new_list ).then( data => {

        response.send(data)

    }).catch( e => {
        response.status(500).send({
            message: 'An error occured while adding this list.'
        })
    })

}

exports.find_by_id = ( request, response ) => {

    const id = request.params.id

    List.findById( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'The requested list could not be found.'
        })
        else response.send(data)

    }).catch( e => {
        response.status(500).send({
            message: 'An error occurred while retrieving this list.'
        })
    })

}

exports.find_by_id_and_update = ( request, response ) => {

    if ( !request.body ) response.status(404).send({
        message: 'Data cannot be empty.'
    })

    const id = request.params.id

    const request_name = request.body.name
    const request_description = request.body.descriptions
    const request_order = request.body.order

    const request_body = {
        name: request_name,
        description: request_description,
        order: request_order
    }

    List.findByIdAndUpdate( id, request_body, { useFindAndModify: false } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided list.'
        })

        else response.send({
            message: 'The list was successfully updated.'
        })
        
    }).catch( e => {
        response.status(500).send({
            message: 'There was a problem retrieving the list.'
        })
    })
}

exports.find_by_id_and_delete = ( request, response ) => {
    
    const id = request.params.id

    List.findByIdAndRemove( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'The requested list could not be found.'
        })

        else response.send({
            message: 'The list was successfully deleted.'
        })

    }).catch( e => {
        response.status(500).send({
            message: 'There was a problem deleting the list.'
        })
    })
}

exports.find_by_board = ( request, response ) => {

    const request_board_id = request.params.board_id

    if ( !request_board_id ) response.status(404).send({
        message: 'The requested board could not be found.'
    })

    List.find( { board_id: request_board_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No lists exist within the selected board.'
        })

        else response.send(data)
        
    }).catch( e => {
        response.status(500).send({
            message: 'There was a problem finding the lists.'
        })
    })

}