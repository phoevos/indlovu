const config = require('config')
const mysql = require('mysql')

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

module.exports = connection