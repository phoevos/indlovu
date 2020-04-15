module.exports = (app) => {
    const {getProduct, getProductList, createProduct, updateProduct, deleteProduct, getHistory} = require('../controllers/productController')

    app.route('/db/api/products')
        .get(getProductList)
        .post(createProduct)
        
    app.route('/db/api/products/:product')
        .get(getProduct)
        .put(updateProduct)
        .delete(deleteProduct)

    app.get('/db/api/products/:product/history', getHistory)
}