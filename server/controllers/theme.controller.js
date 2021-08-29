
const db = require('./../models/index.js')
const Theme = db.theme_model

exports.add = ( request, response ) => {

    const new_theme = new Theme ({
        user_id: request.body.user_id,

        name: request.body.name,

        primary: request.body.primary,
        secondary: request.body.secondary,
        text: request.body.text,
        emphasis: request.body.emphasis,
        warning: request.body.warning,
        negative: request.body.negative,
        scale_secondary: request.body.scale_secondary,
        scale_text: request.body.scale_text,

        order: request.body.order || 0,
    })

    new_theme.save( new_theme ).then( data => {
        response.send(data)
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'An error occured while saving this theme.'
        })
    })
}

exports.find_by_id = ( request, response ) => {
    
    const id = request.params.id

    Theme.findById( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No themes could be found for the provided ID.'
        })

        else response.send(data)

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem retrieving themes.'
        })
    })
}

exports.find_by_user = ( request, response ) => {
    
    const request_user_id = request.params.user_id

    if ( !request_user_id ) response.status(404).send({
        message: 'The requested user could not be found.'
    })

    Theme.find( { user_id: request_user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No themes could be found for the provided ID.'
        })

        else response.send(data)

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem retrieving themes.'
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
    if ( request.body.colors ) request_body.colors = request.body.colors
    if ( request.body.order ) request_body.order = request.body.order

    request_body.updated = Date.now()

    Theme.findByIdAndUpdate( id, { $set: request_body }, { useFindAndModify: false, new: true } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided theme.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: `There was a problem retrieving the theme.`,
        })
    })

}

exports.find_by_id_and_delete = ( request, response ) => {

    const id = request.params.id

    Theme.findByIdAndRemove( id ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'The requested theme could not be found.'
        })

        else response.send({
            message: 'The theme was successfully deleted.'
        })
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem deleting the theme.'
        })
    })
}