const db = require('../db')

function getStoreList (req, res) {
    getStores = "SELECT * FROM stores"
    db.query(getStores, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getStoreList = getStoreList

function createStore (req, res) {
    newStore = "INSERT INTO stores VALUES ('fountas','1987','pigasoy','6','14564')"
    db.query(newStore, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows.store_id)
    })
}

exports.createStore = createStore

function getStore (req, res) {
    getStoreById = `SELECT * FROM stores WHERE store_id=${req.params.store}`
    db.query(getStoreById, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getStore = getStore

function updateStore (req, res) {
    const name = (req.body.name) ? `name='${req.body.name}'` : ""
    const age = (req.body.age) ? `age=${req.body.age}` : ""
    const date = (req.body.date) ? `date='${req.body.date}'` : ""
    console.log(name, age, date)
    newStore = `UPDATE stores SET ${name} ${age} ${date} WHERE store_id=${req.params.store}`
    console.log(newStore)
    db.query(newStore, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows.store_id)
    })
    res.send(newStore)
}

exports.updateStore = updateStore

function deleteStore (req, res) {
    deleteStoreById = `DELETE FROM stores WHERE store_id=${req.params.store}`
    db.query(deleteStoreById, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.deleteStore = deleteStore