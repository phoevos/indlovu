const config = require('config')
const mysql = require('mysql')
const app = require('./app')

//connect to the database
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: config.get('dbPassword')
  })
  
connection.connect(err => {
    if (err) throw err;
    else console.log("Successfully connected to the database.")
})

// listen for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.")
})