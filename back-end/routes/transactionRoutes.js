module.exports = (app) => {
    const {getTransactions} = require('../controllers/transactionController')

    app.get('/db/api/transactions', getTransactions) // filters included inside the request body

    // possible filters: store, date, amount paid, number of units per product, category, payment method
}