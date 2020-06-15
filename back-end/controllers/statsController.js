const db = require('../db')

function boughtTogether (req, res) {
    getPopularCouples = 
        "SELECT COUNT(c1.date_time) AS times, c1.barcode AS product1, c2.barcode AS product2 FROM contain AS c1 "
      + "CROSS JOIN contain AS c2 ON c1.barcode != c2.barcode AND c1.date_time = c2.date_time "
      + "GROUP BY product1, product2 "
      + "ORDER BY times DESC LIMIT 10;"
        
    db.query(getPopularCouples, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.boughtTogether = boughtTogether

// function houseProducts (req, res) {

// }

// exports.houseProducts = houseProducts

function perLocation (req, res) {
    orderByLocation = 
        "SELECT alley, shelf, COUNT(barcode) AS number_of_products FROM offers "
      + "GROUP BY alley, shelf "
      + "ORDER BY COUNT(barcode) DESC LIMIT 10;"
    db.query(orderByLocation, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.perLocation = perLocation

function hoursPerProfit (req, res) {
    getHoursOrdered = 
        "SELECT HOUR(date_time) hour, SUM(total_amount) amount "
      + "FROM transactions "
      + "GROUP BY HOUR(date_time) "
      + "ORDER BY amount DESC;"
    db.query(getHoursOrdered, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.hoursPerProfit = hoursPerProfit

function clientAgePerHour (req, res) {
    getAgePerHour = 

    db.query(getAgePerHour, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.clientAgePerHour = clientAgePerHour


