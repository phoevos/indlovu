const db = require('../db')

function getClientList (req, res) {
    getClients = "SELECT * FROM clients"
    db.query(getClients, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getClientList = getClientList

function createClient (req, res) {
    newClient = "INSERT INTO clients VALUES ('fountas','1987','pigasoy','6','14564')"
    db.query(newClient, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows.client_id)
    })
}

exports.createClient = createClient

function getClient (req, res) {
    getClientById = `SELECT * FROM clients WHERE client_id=${req.params.client}`
    db.query(getClientById, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getClient = getClient

function updateClient (req, res) {
    const name = (req.body.name) ? `name='${req.body.name}'` : ""
    const age = (req.body.age) ? `age=${req.body.age}` : ""
    const date = (req.body.date) ? `date='${req.body.date}'` : ""
    console.log(name, age, date)
    newClient = `UPDATE clients SET ${name} ${age} ${date} WHERE client_id=${req.params.client}`
    console.log(newClient)
    db.query(newClient, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows.client_id)
    })
    res.send(newClient)
}

exports.updateClient = updateClient

function deleteClient (req, res) {
    deleteClientById = `DELETE FROM clients WHERE client_id=${req.params.client}`
    db.query(deleteClientById, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.deleteClient = deleteClient