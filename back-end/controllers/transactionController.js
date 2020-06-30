const db = require('../db')

function getTransactions (req, res) {
    const date_time = (req.body.date_time) ? `(date_time BETWEEN CAST(${req.body.date_time.min} AS DATE) AND CAST(${req.body.date_time.max} AS DATE)) AND` : ""
    const total_amount = (req.body.total_amount) ? `(total_amount BETWEEN ${req.body.total_amount.min} AND ${req.body.total_amount.max}) AND` : ""
    // const pieces = (req.body.pieces) ? `(pieces BETWEEN ${req.body.pieces.min} AND ${req.body.pieces.max}) AND` : ""
    const category = (req.body.category_id) ? `category_id=${req.body.category_id} AND` : ""
    const paymentMethod = (req.body.payment_method) ? `payment_method='${req.body.payment_method}' AND` : ""
    const store = `store_id='${req.body.store_id}`

    getTransactionsFilter = `SELECT * FROM transactions WHERE ${date_time} ${total_amount} ${pieces} ${category} ${paymentMethod} ${store}`
    console.log(getTransactionsFilter)

    db.query(getTransactionsFilter, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}

exports.getTransactions = getTransactions

// use indlovu;
// SELECT t.date_time, t.total_amount, t.payment_method, c.pieces, p.category_id FROM transactions AS t
// JOIN contain AS c USING(date_time)
// JOIN products AS p USING(barcode)
// #GROUP BY date_time SUM(pieces) AS total_
// #HAVING total_pieces BETWEEN 4 AND 9
// ORDER BY date_time