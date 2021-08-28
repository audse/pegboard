
const db = require('./../models/index')
const List = db.list_model

exports.add = ( request, response ) => {

    const new_list = new List ({

        user_id: request.body.user_id,
        board_id: request.body.board_id,

        name: request.body.name,
        description: request.body.description ? request.body.description : '',

    })

    new_list.save( new_list ).then( data => {

        response.send(data)

    }).catch( e => {
        console.log(e)
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
        console.log(e)
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

    let request_body = {}
    if ( request.body.name ) request_body.name = request.body.name
    if ( request.body.description ) request_body.description = request.body.description
    if ( request.body.order ) request_body.order = request.body.order
    request_body.updated = Date.now()

    List.findByIdAndUpdate( id, { $set: request_body }, { useFindAndModify: false, new: true } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided list.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
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
        console.log(e)
        response.status(500).send({
            message: 'There was a problem deleting the list.'
        })
    })
}

exports.find_by_board = ( request, response ) => {

    const request_board_id = request.params.board_id
    const request_user_id = request.params.user_id

    if ( !request_board_id || !request_user_id ) response.status(404).send({
        message: 'The requested board could not be found.'
    })

    List.find( { board_id: request_board_id, user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No lists exist within the selected board.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem finding the lists.'
        })
    })

}

// exports.find_by_user = ( request, response ) => {

//     const request_user_id = request.params.user_id

//     if ( !request_user_id ) response.status(404).send({
//         message: 'The requested list could not be found.'
//     })

//     List.find( { user_id: request_user_id } ).then( data => {

//         if ( !data ) response.status(404).send({
//             message: 'No lists exist for the selected user.'
//         })

//         else response.send(data)
        
//     }).catch( e => {
//         console.log(e)
//         response.status(500).send({
//             message: 'There was a problem finding the lists.'
//         })
//     })

// }