
const db = require('./../models/index.js')
const Preference = db.preference_model

exports.add = ( request, response ) => {

    const new_preference = new Preference ({
        user_id: request.body.user_id,

        theme_id: request.body.theme_id
    })

    new_preference.save( new_preference ).then( data => {
        response.send(data)
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'An error occured while saving this preference.'
        })
    })
}

exports.find_by_user_id = ( request, response ) => {
    
    const user_id = request.params.user_id

    Preference.find( { user_id: user_id } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'No preferences could be found for the provided ID.'
        })

        else response.send(data)

    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: 'There was a problem retrieving preferences.'
        })
    })
}

exports.find_by_user_id_and_update = ( request, response ) => {

    if ( !request.body ) return response.status(404).send({
        message: 'Data cannot be empty.'
    })

    const user_id = request.params.user_id

    let request_body = {}

    if ( request.body.theme_id ) request_body.theme_id = request.body.theme_id

    Preference.findOneAndUpdate( { user_id }, { $set: request_body }, { useFindAndModify: false, new: true } ).then( data => {

        if ( !data ) response.status(404).send({
            message: 'An error occurred attempting to update provided preference.'
        })

        else response.send(data)
        
    }).catch( e => {
        console.log(e)
        response.status(500).send({
            message: `There was a problem retrieving the preference.`,
        })
    })

}
