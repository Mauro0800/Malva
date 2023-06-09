const db = require('../database/models');

module.exports = (req,res,next)  => {
    db.Brand.findAll({}).then(brands => {
        res.locals.brands = brands
    })
    .catch(error=>console.log(error))
    next()
}