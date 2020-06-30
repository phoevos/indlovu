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
    const phones = req.body.phone
    const newStore = 
    "INSERT INTO stores (opening_hours, size, street, number, postal_code, city)"
        + "VALUES ("
        + `'${req.body.opening_hours}',`
        + `${req.body.size},`
        + `'${req.body.street}',`
        + `${req.body.number},`
        + `${req.body.postal_code},`
        + `'${req.body.city}');`
    
    db.query(newStore, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            let insertPhones
            let store = rows.insertId
            phones.forEach(phone => {
                insertPhones += `INSERT INTO phones VALUES (${phone}, ${store}); `
            })
            db.query(insertPhones, (err, rows) => {
                if(err) res.status(400).send(err.message) 
                else {
                    res.send(store)
                }
            })
        }
    })
}

exports.createStore = createStore

function getStore (req, res) {
    getStoreById = "SELECT * FROM stores "
                + "JOIN phones USING (store_id) "
                + `WHERE store_id=${req.params.store}`
    db.query(getStoreById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            const phones = Object.keys(rows).map(key => rows[key].phone_id)
            const result = {...rows[0], phones}
            res.send(result)
        }
    })
}

exports.getStore = getStore

function updateStore (req, res) {
    const store = req.params.store
    const opening_hours = (req.body.opening_hours) ? `operating_hours='${req.body.operating_hours}',` : ""
    const size = (req.body.size) ? `size=${req.body.size},` : ""
    const street = (req.body.street) ? `street='${req.body.street}',` : ""
    const number = (req.body.number) ? `number=${req.body.number},` : ""
    const postal_code = (req.body.postal_code) ? `postal_code=${req.body.postal_code},` : ""
    const city = (req.body.city) ? `city='${req.body.city}'` : ""
    const phones = (req.body.phone)
    let newStore = `UPDATE stores SET ${opening_hours} ${size} ${street} `
            + `${number} ${postal_code} ${city} WHERE store_id=${store};`
            
    let deletePhones = `DELETE phones WHERE ${store}; `

    let insertPhones
    phones.forEach(phone => {
        insertPhones += `INSERT INTO phones VALUES (${phone}, ${store}); `
    })
     
    db.query(newStore, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            db.query(deletePhones, (err, rows) => {
                if(err) res.status(400).send(err.message) 
                else {
                    db.query(insertPhones, (err, rows) => {
                        if(err) res.status(400).send(err.message) 
                        else {
                            res.send(store)
                        }
                    })
                }
            })
        }
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