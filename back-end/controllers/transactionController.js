const db = require('../db')

function getTransactions (req, res) {
    const date_time = (req.body.date_time) ? `(DATE(date_time) BETWEEN '${req.body.date_time[0]}' AND '${req.body.date_time[1]}') AND` : ""
    const total_amount = (req.body.total_amount) ? `(total_amount BETWEEN ${req.body.total_amount[0]} AND ${req.body.total_amount[1]}) AND` : ""
    const pieces = (req.body.pieces) ? `HAVING total_pieces BETWEEN ${req.body.pieces[0]} AND ${req.body.pieces[1]}` : ""
    const paymentMethod = (req.body.payment_method) ? `payment_method='${req.body.payment_method}' AND` : ""
    const store = `store_id=${req.body.store_id}`

    getTransactionsFilter = "SELECT date_time, total_amount, payment_method, SUM(pieces) AS total_pieces FROM transactions "
                            + "JOIN contain USING(date_time) "
                            + "JOIN products USING(barcode) "
                            + `WHERE ${date_time} ${total_amount} ${paymentMethod} ${store} `
                            + "GROUP BY date_time "
                            + `${pieces} `
                            + "ORDER BY date_time DESC;"

    db.query(getTransactionsFilter, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.getTransactions = getTransactions

function getTransactionProducts (req, res) {
    const date_time = (req.body.date_time) ? `(DATE(date_time) BETWEEN '${req.body.date_time[0]}' AND '${req.body.date_time[1]}') AND` : ""
    const total_amount = (req.body.total_amount) ? `(total_amount BETWEEN ${req.body.total_amount[0]} AND ${req.body.total_amount[1]}) AND` : ""
    const pieces = (req.body.pieces) ? `(pieces BETWEEN ${req.body.pieces[0]} AND ${req.body.pieces[1]}) AND` : ""
    const category = (req.body.category_id) ? `category_id=${req.body.category_id} AND` : ""
    const paymentMethod = (req.body.payment_method) ? `payment_method='${req.body.payment_method}' AND` : ""
    const store = `store_id=${req.body.store_id}`

    getTransactionsFilter = "SELECT * FROM transactions "
                            + "JOIN contain USING(date_time) "
                            + "JOIN products USING(barcode) "
                            + `WHERE ${date_time} ${total_amount} ${pieces} ${category} ${paymentMethod} ${store} `
                            + "ORDER BY date_time DESC;"                            

    db.query(getTransactionsFilter, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.getTransactionProducts = getTransactionProducts