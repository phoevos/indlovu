import app from './app'
import express from 'express'
import mysql from 'mysql'
import config from 'config'

//connect to the database
let con = mysql.createConnection({
    host: "localhost",
    user: "indlovu",
    password: config.get('dbPassword')
  })
  
con.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the database.")
})
  

// listen for requests
app.listen(8765, () => {
    console.log("Server is listening on port 8765.")
})