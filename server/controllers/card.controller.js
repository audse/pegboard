
const db = require('./../models/index')
const Card = db.card_model

exports.add = ( request, response ) => {

    const new_card = new Card ({

        user_id: request.body.user_id,
        board_id: request.body.board_id,
        list_id: request.body.list_id,

        display: request.body.display || 'card',
        name: request.body.name,
        content: request.body.content || '',

        date_due: request.body.date_due || null,
        date_todo: request.body.date_todo || null,

        order: request.body.order || 0,
        date_created: request.body.date_created || Date.now(),

    })

    new_card.save( new_card ).then( data => {

        response.send(data)

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'An error occured while adding this card.'
        })
    })

}

exports.find_by_id = ( request, response ) => {

    const id = request.params.id

    Card.findById( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'The requested card could not be found.'
        })
        else response.send(data)

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'An error occurred while retrieving this card.'
        })
    })

}

exports.find_by_id_and_update = ( request, response ) => {

    if ( !request.body ) response.status(404).send({
        message: 'Data cannot be empty.'
    })

    const id = request.params.id

    const display = request.body.display || null
    const name = request.body.name || null
    const content = request.body.content || null

    const date_due = request.body.date_due || null
    const date_todo = request.body.date_todo || null

    const order = request.body.order || 0

    let update = {}
    if ( display ) update.display = display
    if ( name ) update.name = name
    if ( content ) update.content = content
    if ( date_due ) update.date_due = date_due
    if ( date_todo ) update.date_todo = date_todo
    if ( order !== undefined ) update.order = order

    update.updated = Date.now()

    Card.findByIdAndUpdate( id, { $set: update }, { useFindAndModify: false, new: true } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided card.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem retrieving the card.'
        })
    })
}

exports.find_by_id_and_delete = ( request, response ) => {
    
    const id = request.params.id

    Card.findByIdAndRemove( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'The requested card could not be found.'
        })

        else response.send({
            message: 'The card was successfully deleted.'
        })

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem deleting the card.'
        })
    })
}

exports.find_by_board = ( request, response ) => {

    const request_board_id = request.params.board_id
    const request_user_id = request.params.user_id

    if ( !request_board_id || !request_user_id ) response.status(404).send({
        message: 'The requested board could not be found.'
    })

    Card.find( { board_id: request_board_id, user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No cards exist within the selected board.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem finding the cards.'
        })
    })

}

exports.find_by_list = ( request, response ) => {

    const request_board_id = request.params.board_id
    const request_list_id = request.params.list_id
    const request_user_id = request.params.user_id

    if ( !request_board_id || !request_user_id || !request_list_id ) response.status(404).send({
        message: 'The requested board could not be found.'
    })

    Card.find( { board_id: request_board_id, list_id: request_list_id, user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No cards exist within the selected board.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem finding the cards.'
        })
    })

}

exports.find_by_user = ( request, response ) => {

    const request_user_id = request.params.user_id

    if ( !request_user_id ) response.status(404).send({
        message: 'The requested card could not be found.'
    })

    Card.find( { user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No cards exist for the selected user.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem finding the cards.'
        })
    })

}