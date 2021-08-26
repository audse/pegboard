
const db = require('./../models/index.js')
const Test = db.test_model

/*

Request is the input/query, while response if what the backend does in response.

E.g.:

request = name: Audrey, username: audse
response = data saved, or error: that username is taken

*/

exports.create = ( request, response ) => {

    // Validation would go here

    // Add the request (POST) data to the new object
    const new_test_object = new Test({
        title: request.body.title,
        subtitle: request.body.subtitle
    })
    
    // Attempt to save the data to the database
    new_test_object.save( new_test_object ).then( data => {
        response.send(data)
    }).catch( e => {
        response.status(500).send({
            message: e ? e : 'An error occured while creating this object.'
        })
    })

}

exports.findAll = ( request, response ) => {

    // This accepts a query `request`, rather than data to save

    const title = request.query.title

    let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {}

    // Attempt to pull the data from the database
    Test.find( condition ).then( data => {
        response.send(data)
    }).catch( e => {
        response.status(500).send({
            message: e ? e : 'An error occured while searching for objects.'
        })
    })
}

exports.findById = (request, response) => {

    const id = request.params.id;
  
    Test.findById( id ).then( data => {

        if ( !data ) 

        response.status(404).send({
            message: "Not found test with ID " + id
        })

        else response.send(data);

    }).catch( e => {
        response.status(500).send({ 
            message: e ? e : "Error retrieving test with ID " + id 
        })
    });

  }