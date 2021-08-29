

// Node/Express Backend Server Setup

const express = require("express")

const port = process.env.PORT || 5000

const app = express()

app.use( express.json() )


// Cors (Permissions) Setup

const cors = require("cors")

const corsOptions = { 
    origin: '*', 
    credentials: true, 
}

app.use(cors(corsOptions))


// Backend Routing

require('./server/routes/board.routes.js')(app)
require('./server/routes/list.routes.js')(app)
require('./server/routes/card.routes.js')(app)
require('./server/routes/theme.routes.js')(app)


const { createProxyMiddleware } = require('http-proxy-middleware')

app.use('/api', createProxyMiddleware({
    target: `http://localhost:5000`,
    pathRewrite: {'^/api' : ''}
  }))


app.listen(port, () => {
	console.log(`Server has started: running on port ${port}.`);
})

// MongoDB/Mongoose Initialization

const db = require('./server/models/index.js')

db.mongoose.connect(

    db.url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }

).then( () => {
    console.log('Connection to DB successful.')
}).catch( e => {
    console.log('Connection to DB failed.', e)
    process.exit();
})
