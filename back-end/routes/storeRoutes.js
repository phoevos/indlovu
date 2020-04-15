module.exports = (app) => {
    const {getStore, getStoreList, createStore, updateStore, deleteStore} = require('../controllers/storeController')

    app.route('/db/api/stores')
        .get(getStoreList)
        .post(createStore)
        
    app.route('/db/api/stores/:store')
        .get(getStore)
        .put(updateStore)
        .delete(deleteStore)
}