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

function houseProducts (req, res) {
    getPercPerCat = 
        "SELECT COUNT(*)/( "
           + "SELECT COUNT(*) FROM transactions "
           + "JOIN contain USING(date_time) "
           + "JOIN products AS pr USING(barcode) "
           + "WHERE pr.category_id=p.category_id "
        + ") * 100 AS percentage, category_id "
        + "FROM transactions "
        + "JOIN contain USING(date_time) "
        + "JOIN products AS p USING(barcode) "
        + "WHERE market_label=true "
        + "GROUP BY category_id; "

    db.query(getPercPerCat, (err,rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.houseProducts = houseProducts

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
        "SELECT COUNT(*)/( "
            + "SELECT COUNT(*) FROM transactions "
            + "JOIN customer USING(card_id) "
            + "WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 18 AND 24 "
            + ") * 100 AS percentage, HOUR(date_time) AS hour, '18-24' AS age_group "
        + "FROM transactions "
        + "JOIN customer USING(card_id) "
        + "WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 18 AND 24 "
        + "GROUP BY age_group, hour "
        + "UNION "
        + "SELECT COUNT(*)/( "
            + "SELECT COUNT(*) FROM transactions "
            + "JOIN customer USING(card_id) "
            + "WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 25 AND 39 "
        + ") * 100 AS percentage, HOUR(date_time) AS hour, '25-39' AS age_group FROM transactions "
        + "JOIN customer USING(card_id) "
        + "WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 25 AND 39 "
        + "GROUP BY age_group, hour "
        + "UNION "
        + "SELECT COUNT(*)/( "
            + "SELECT COUNT(*) FROM transactions "
            + "JOIN customer USING(card_id) "
            + "WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 40 AND 64 "
        + ") * 100 AS percentage, HOUR(date_time) AS hour, '40-64' AS age_group FROM transactions "
        + "JOIN customer USING(card_id) "
        + "WHERE YEAR(NOW())-YEAR(date_of_birth) BETWEEN 40 AND 64 "
        + "GROUP BY age_group, hour "
        + "UNION "
        + "SELECT COUNT(*)/( "
            + "SELECT COUNT(*) FROM transactions "
            + "JOIN customer USING(card_id) "
            + "WHERE YEAR(NOW())-YEAR(date_of_birth) >= 65 "
        + ") * 100 AS percentage, HOUR(date_time) AS hour, '65+' AS age_group FROM transactions "
        + "JOIN customer USING(card_id) "
        + "WHERE YEAR(NOW())-YEAR(date_of_birth) >= 65 "
        + "GROUP BY age_group, hour "
        + "ORDER BY age_group, hour; "

    db.query(getAgePerHour, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.clientAgePerHour = clientAgePerHour

function hallOfFame (req, res) {
    getMostPoints = 
        "SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(name, ' ', 1), ' ', -1) AS name, "
                + "YEAR(NOW())-YEAR(date_of_birth) AS age, points FROM customer "
        + "ORDER BY points DESC LIMIT 5; "

    db.query(getMostPoints, (err, rows) => {
        if (err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.hallOfFame = hallOfFame

