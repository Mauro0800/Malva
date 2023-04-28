const { literal } = require('sequelize');

const literalQueryUrlImage = (
    req, // Petición
    nameImage, // Nombre de la imágen
    field, // Campo
) => {
    const urlImage = (req) =>
        `${req.protocol}://${req.get('host')}/products/images/`; // Protocolo (https://) - Dominio (Ej: malva.com) - "/products/images/" - Nombre de la imágen
    return [literal(`CONCAT('${urlImage(req)}',${nameImage})`), field];
};

module.exports = literalQueryUrlImage;