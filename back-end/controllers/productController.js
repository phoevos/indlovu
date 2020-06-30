const db = require('../db')

function getProductList (req, res) {
    getProducts = "SELECT p.barcode, p.name, p.brand_name, p.price FROM products AS p"
    db.query(getProducts, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getProductList = getProductList

function createProduct (req, res) {
    newProduct = 
        "INSERT INTO products (price, name, brand_name, first_transaction, category_id)"
        + "VALUES ("
        + `${req.body.price},`
        + `'${req.body.name}',`
        + `'${req.body.brand_name}',`
        + `'${req.body.first_transaction}',`
        + `${req.body.category_id});`
    db.query(newProduct, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send({"barcode": rows.insertId})
    })
}

exports.createProduct = createProduct

function getProduct (req, res) {
    getProductById = 
        "SELECT p.barcode, p.name, p.brand_name, c.name AS category_name, p.price, p.first_transaction FROM products AS p " 
        + "LEFT JOIN category AS c ON p.category_id = c.category_id "
        + `WHERE p.barcode=${req.params.product};`
    db.query(getProductById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getProduct = getProduct

function updateProduct (req, res) {
    const name = (req.body.name) ? `name='${req.body.name}',` : ""
    const brand_name = (req.body.brand_name) ? `brand_name='${req.body.brand_name}',` : ""
    const price = (req.body.price) ? `price=${req.body.price},` : ""
    const first_transaction = (req.body.first_transaction) ? `first_transaction='${req.body.first_transaction}',` : ""
    const category_id = (req.body.category_id) ? `category_id=${req.body.category_id}` : ""
    let newProduct = `UPDATE products SET ${name} ${brand_name} ${price} ${first_transaction} ${category_id} `
                    + ` WHERE barcode=${req.params.product};`
    db.query(newProduct, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send({"message": rows.message})
    })
}

exports.updateProduct = updateProduct

function deleteProduct (req, res) {
    deleteProductById = `DELETE FROM products WHERE barcode=${req.params.product}`
    db.query(deleteProductById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send()
    })
}

exports.deleteProduct = deleteProduct

function getHistory (req, res) {
    getHistoryById = 
        `SELECT * FROM older_prices AS o WHERE o.barcode=${req.params.product} `
        + "ORDER BY start_date DESC;"
    db.query(getHistoryById, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}

exports.getHistory = getHistory