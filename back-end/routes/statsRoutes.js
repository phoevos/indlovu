module.exports = (app) => {
    const {boughtTogether, houseProducts, perLocation, hoursPerProfit, clientAgePerHour} = require('../controllers/statsController')

    app.get('/db/api/stats/hot-couples', boughtTogether)    // most popular product couples
    // app.get('/db/api/stats/house', houseProducts)   // percentage of House products sold per category
    app.get('/db/api/stats/location', perLocation)  // most popular store location
    app.get('/db/api/stats/rush-hour', hoursPerProfit)  // most fruitful times of day
    app.get('/db/api/stats/age-time', clientAgePerHour)  // percentage of age group per operating hour
}