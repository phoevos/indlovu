import express from 'express'
import cors from 'cors'

// create express app
const app = express()

//enable cors
app.use(cors())

// parse application/json
app.use(bodyParser.json())

require('./routes/clientRoutes')(app)
require('./routes/productRoutes')(app)

module.exports = app