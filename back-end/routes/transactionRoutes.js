module.exports = (app) => {
    const {getTransactions, getTransactionProducts} = require('../controllers/transactionController')

    app.post('/db/api/transactions', getTransactions)
    app.post('/db/api/transactions/products', getTransactionProducts)
}