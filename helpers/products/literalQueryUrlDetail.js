const { literal } = require('sequelize');

module.exports = (req,id,field) => {
    const urlDetail = req => `${req.protocol}://${req.get('host')}/api/products/`
    return [literal(`CONCAT('${urlDetail(req)}',${id})`), field];
}