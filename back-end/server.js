const app = require('./app')

//connect to the database
require('./db')

// listen for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.")
})