const db = require('../db')

function getTransactions (req, res) {
    const date_time = (req.params.date_time) ? `(DATE(date_time) BETWEEN '${req.params.date_time[0]}' AND '${req.params.date_time[1]}') AND` : ""
    const total_amount = (req.params.total_amount) ? `(total_amount BETWEEN ${req.params.total_amount[0]} AND ${req.params.total_amount[1]}) AND` : ""
    const pieces = (req.params.pieces) ? `HAVING total_pieces BETWEEN ${req.params.pieces[0]} AND ${req.params.pieces[1]}` : ""
    const paymentMethod = (req.params.payment_method) ? `payment_method='${req.params.payment_method}' AND` : ""
    const store = `store_id=${req.params.store_id}`

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
    const date_time = (req.params.date_time) ? `(DATE(date_time) BETWEEN '${req.params.date_time[0]}' AND '${req.params.date_time[1]}') AND` : ""
    const total_amount = (req.params.total_amount) ? `(total_amount BETWEEN ${req.params.total_amount[0]} AND ${req.params.total_amount[1]}) AND` : ""
    const pieces = (req.params.pieces) ? `(pieces BETWEEN ${req.params.pieces[0]} AND ${req.params.pieces[1]}) AND` : ""
    const category = (req.params.category_id) ? `category_id=${req.params.category_id} AND` : ""
    const paymentMethod = (req.params.payment_method) ? `payment_method='${req.params.payment_method}' AND` : ""
    const store = `store_id=${req.params.store_id}`

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