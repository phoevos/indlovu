const db = require('../db')

function getClientList (req, res) {
    getClients = "SELECT c.card_id, c.name, c.city FROM customer AS c;"
    db.query(getClients, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getClientList = getClientList

function createClient (req, res) {
    const pet = req.body.pet ? 'req.body.pet' : null
    newClient = 
    "INSERT INTO customer (phone, pet, family_members, street, number, postal_code, city, name, date_of_birth, points)"
        + "VALUES ("
        + `'${req.body.phone}',`
        + `${pet},`
        + `${req.body.family_members},`
        + `'${req.body.street}',`
        + `${req.body.number},`
        + `${req.body.postal_code},`
        + `'${req.body.city}',`
        + `'${req.body.name}',`
        + `'${req.body.date_of_birth}',`
        + "0);"
    db.query(newClient, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send({"customer_id": rows.insertId})
    })
}

exports.createClient = createClient

function getClient (req, res) {
    getClientById = `SELECT * FROM customer WHERE card_id=${req.params.client};`
    db.query(getClientById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getClient = getClient

function updateClient (req, res) {
    const phone = (req.body.phone) ? `phone='${req.body.phone}',` : ""
    // let pet = req.body.pet
    // if (!pet) pet = ""
    // else if (pet == "NULL") pet = null
    // else pet = `pet='${req.body.pet}',`
    const pet = (req.body.pet) ? `pet='${req.body.pet}',` : ""
    const family_members = (req.body.family_members) ? `family_members=${req.body.family_members},` : ""
    const street = (req.body.street) ? `street='${req.body.street}',` : ""
    const number = (req.body.number) ? `number=${req.body.number},` : ""
    const postal_code = (req.body.postal_code) ? `postal_code=${req.body.postal_code},` : ""
    const city = (req.body.city) ? `city='${req.body.city}',` : ""
    const name = (req.body.name) ? `name='${req.body.name}',` : ""
    const date_of_birth = (req.body.date_of_birth) ? `date_of_birth='${req.body.date_of_birth}',` : ""
    const points = (req.body.points) ? `points=${req.body.points},` : ""
    let newClient = `UPDATE customer SET ${phone} ${pet} ${family_members} ${street} `
            + `${number} ${postal_code} ${city} ${name} ${date_of_birth} ${points} `
    newClient = newClient.slice(0,-2) + ` WHERE card_id=${req.params.client};`
    db.query(newClient, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send({"message": rows.message})
    })
}

exports.updateClient = updateClient

function deleteClient (req, res) {
    deleteClientById = `DELETE FROM customer WHERE card_id=${req.params.client};`
    db.query(deleteClientById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send()
    })
}

exports.deleteClient = deleteClient