const { literal } = require('sequelize');

module.exports = (req,nameImage,field) => {
    const urlImage = req => `${req.protocol}://${req.get('host')}/images/users/`
    return [literal(`CONCAT('${urlImage(req)}',${nameImage})`),field]
}