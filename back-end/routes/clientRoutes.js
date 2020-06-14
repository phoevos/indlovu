module.exports = (app) => {
    const { getClient, getClientList, createClient, updateClient, deleteClient, getFavouriteProducts, 
            getVisitedStores, getHours, getAverageMonth, getAverageYear } = require('../controllers/clientController')

    app.route('/db/api/clients')
        .get(getClientList)
        .post(createClient)    

    app.route('/db/api/clients/:client')
        .get(getClient)
        .put(updateClient)
        .delete(deleteClient)

    app.get('/db/api/clients/:client/transactions/favourite', getFavouriteProducts)
    app.get('/db/api/clients/:client/transactions/stores', getVisitedStores)
    app.get('/db/api/clients/:client/transactions/hours', getHours)
    app.get('/db/api/clients/:client/transactions/average/month', getAverageMonth)
    app.get('/db/api/clients/:client/transactions/average/year', getAverageYear)
}