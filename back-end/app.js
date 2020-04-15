const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser');

// create express app
const app = express()

//enable cors
app.use(cors())

// parse application/json
app.use(bodyParser.json())

require('./routes/clientRoutes')(app)
require('./routes/productRoutes')(app)
require('./routes/transactionRoutes')(app)
require('./routes/storeRoutes')(app)
require('./routes/statsRoutes')(app)

module.exports = app