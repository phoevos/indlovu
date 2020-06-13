const db = require('../db')

function getTransactions (req, res) {
    const date = (req.body.date) ? `date='${req.body.date}',` : ""
    const amountPaid = (req.body.amountPaid) ? `amountPaid=${req.body.amountPaid},` : ""
    const units = (req.body.units) ? `units=${req.body.units},` : ""
    const category = (req.body.category) ? `category=${req.body.category},` : ""
    const paymentMethod = (req.body.payment_method) ? `payment_method='${req.body.payment_method}',` : ""
    const store = (req.body.store_id) ? `store_id='${req.body.store_id}'` : ""
    getTransactionsFilter = `SELECT * FROM transactions WHERE ${date} ${amountPaid} ${units} ${category} ${paymentMethod} ${store}`
    db.query(getTransactionsFilter, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getTransactions = getTransactions
