const db = require('../database/models');

module.exports = (req,res,next)  => {
    db.Category.findAll().then(categories => {
        res.locals.categories = categories
        console.log(locals.categories);
    })
    .catch(error=>console.log(error))
    next()
}