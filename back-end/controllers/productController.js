const db = require('../db')

function getProductList (req, res) {
    getProducts = "SELECT * FROM products"
    db.query(getProducts, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getProductList = getProductList

function createProduct (req, res) {
    newProduct = "INSERT INTO products VALUES ('fountas','1987','pigasoy','6','14564')"
    db.query(newProduct, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows.product_id)
    })
}

exports.createProduct = createProduct

function getProduct (req, res) {
    getProductById = `SELECT * FROM products WHERE product_id=${req.params.product}`
    db.query(getProductById, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.getProduct = getProduct

function updateProduct (req, res) {
    const name = (req.body.name) ? `name='${req.body.name}'` : ""
    const age = (req.body.age) ? `age=${req.body.age}` : ""
    const date = (req.body.date) ? `date='${req.body.date}'` : ""
    console.log(name, age, date)
    newProduct = `UPDATE products SET ${name} ${age} ${date} WHERE product_id=${req.params.product}`
    console.log(newProduct)
    db.query(newProduct, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows.Product_id)
    })
    res.send(newProduct)
}

exports.updateProduct = updateProduct

function deleteProduct (req, res) {
    deleteProductById = `DELETE FROM products WHERE product_id=${req.params.product}`
    db.query(deleteProductById, (err, rows, fields) => {
        if(err) throw err
        else res.send(rows)
    })
}

exports.deleteProduct = deleteProduct