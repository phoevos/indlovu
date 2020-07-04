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
    const pet = req.body.pet ? `'${req.body.pet}'` : null
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
    const pet = (req.body.pet) ? `pet='${req.body.pet}',` : ""
    const family_members = (req.body.family_members) ? `family_members=${req.body.family_members},` : ""
    const street = (req.body.street) ? `street='${req.body.street}',` : ""
    const number = (req.body.number) ? `number=${req.body.number},` : ""
    const postal_code = (req.body.postal_code) ? `postal_code=${req.body.postal_code},` : ""
    const city = (req.body.city) ? `city='${req.body.city}',` : ""
    const name = (req.body.name) ? `name='${req.body.name}',` : ""
    const date_of_birth = (req.body.date_of_birth) ? `date_of_birth='${req.body.date_of_birth}',` : ""
    const points = (req.body.points) ? `points=${req.body.points}` : ""
    let newClient = `UPDATE customer SET ${phone} ${pet} ${family_members} ${street} `
            + `${number} ${postal_code} ${city} ${name} ${date_of_birth} ${points} `
            + `WHERE card_id=${req.params.client};`
    db.query(newClient, (err, rows) => {
        if (err) res.status(400).send(err.message) 
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

function getFavouriteProducts (req, res) {
    getFavourites = 
        "SELECT DISTINCT c.barcode, p.name, p.brand_name "
        + "FROM transactions AS t "
        + "JOIN contain AS c USING (date_time) "
        + "JOIN products AS p USING (barcode) "
        + `WHERE card_id=${req.params.client} `
        + "ORDER BY (SELECT COUNT(c.barcode) "
                    + "FROM transactions AS t "
                    + "JOIN contain AS c USING (date_time) "
                    + `WHERE card_id=${req.params.client}) `
        + "DESC LIMIT 10;"

    db.query(getFavourites, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getFavouriteProducts = getFavouriteProducts

function getVisitedStores (req, res) {
    getStores = 
        "SELECT COUNT(*) AS times_visited, store_id, street, number, city, postal_code FROM transactions "
        + "JOIN stores USING(store_id) "
        + `WHERE card_id=${req.params.client} `
        + "GROUP BY store_id "
        + "ORDER BY times_visited DESC; "

    db.query(getStores, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getVisitedStores = getVisitedStores

function getHours (req, res) {
    getHourlySum = 
        "SELECT HOUR(date_time) AS hour, COUNT(*) AS total FROM transactions "
        + `WHERE card_id=${req.params.client} `
        + "GROUP BY hour "
        + "ORDER BY hour; "

    db.query(getHourlySum, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.getHours = getHours

function getAverage (req, res) {
    getByMonth = 
        "SELECT AVG( total_month ) average_per_month, AVG( total_week ) average_per_week " 
        + "FROM (SELECT date_time, SUM( total_amount ) total_month "
               + "FROM  transactions "
               + `WHERE card_id=${req.params.client} `
               + "GROUP BY MONTH( date_time ) "
               + ") amount_per_month, "
             + "(SELECT date_time, SUM( total_amount ) total_week "
               + "FROM  transactions "
               + `WHERE card_id=${req.params.client} `
               + "GROUP BY WEEK( date_time ) "
               + ") amount_per_week "

    db.query(getByMonth, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            res.send(rows)
        }
    })
}

exports.getAverage = getAverage
