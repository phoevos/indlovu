module.exports = (app) => {
    const {getClient, getClientList, createClient, updateClient, deleteClient} = require('../controllers/clientController')

    app.route('/db/api/clients')
        .get(getClientList)
        .post(createClient)    

    app.route('/db/api/clients/:client')
        .get(getClient)
        .put(updateClient)
        .delete(deleteClient)

    // app.get('/db/api/clients/:client/transactions')
}