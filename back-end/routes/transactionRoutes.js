module.exports = (app) => {
    const {getTransactions, getTransactionProducts} = require('../controllers/transactionController')

    app.get('/db/api/transactions', getTransactions)
    app.get('/db/api/transactions/products', getTransactionProducts)
}