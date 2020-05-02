const db = require('../db')

function getTransactions (req, res) {
    const store = (req.body.store) ? `store='${req.body.store}'` : ""
    const date = (req.body.date) ? `date='${req.body.date}'` : ""
    const amountPaid = (req.body.amountPaid) ? `amountPaid=${req.body.amountPaid}` : ""
    const units = (req.body.units) ? `units=${req.body.units}` : ""
    const category = (req.body.category) ? `category='${req.body.category}'` : ""
    const paymentMethod = (req.body.paymentMethod) ? `paymentMethod='${req.body.paymentMethod}'` : ""
    getTransactionsFilter = `SELECT * FROM transactions WHERE ${store} ${date} ${amountPaid} ${units} ${category} ${paymentMethod}`
    db.query(getTransactionsFilter, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getTransactions = getTransactions
