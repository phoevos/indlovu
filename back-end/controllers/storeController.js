const db = require('../db')

function getStoreList (req, res) {
    getStores = "SELECT s.store_id, s.street, s.number, s.postal_code, s.city FROM stores AS s"
    db.query(getStores, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getStoreList = getStoreList

function createStore (req, res) {
    newStore = 
    "INSERT INTO stores (opening_hours, phone_id, size, street, number, postal_code, city)"
        + "VALUES ("
        + `'${req.body.opening_hours}',`
        + `'${req.body.phone_id}',`
        + `${req.body.size},`
        + `'${req.body.street}',`
        + `${req.body.number},`
        + `${req.body.postal_code},`
        + `'${req.body.city}');`
    db.query(newStore, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send({"store_id": rows.insertId})
    })
}

exports.createStore = createStore

function getStore (req, res) {
    getStoreById = `SELECT * FROM stores WHERE store_id=${req.params.store}`
    db.query(getStoreById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getStore = getStore

function updateStore (req, res) {
    const opening_hours = (req.body.opening_hours) ? `opening_hours='${req.body.opening_hours}',` : ""
    const phone_id = (req.body.phone_id) ? `phone_id='${req.body.phone_id}',` : ""
    const size = (req.body.size) ? `size=${req.body.size},` : ""
    const street = (req.body.street) ? `street='${req.body.street}',` : ""
    const number = (req.body.number) ? `number=${req.body.number},` : ""
    const postal_code = (req.body.postal_code) ? `postal_code=${req.body.postal_code},` : ""
    const city = (req.body.city) ? `city='${req.body.city}',` : ""
    let newStore = `UPDATE stores SET ${opening_hours} ${phone_id} ${size} ${street} `
            + `${number} ${postal_code} ${city} `
    newStore = newStore.slice(0,-2) + ` WHERE store_id=${req.params.store};`
    db.query(newStore, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send({"message": rows.message})
    })
}

exports.updateStore = updateStore

function deleteStore (req, res) {
    deleteStoreById = `DELETE FROM stores WHERE store_id=${req.params.store}`
    db.query(deleteStoreById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send()
    })
}

exports.deleteStore = deleteStore