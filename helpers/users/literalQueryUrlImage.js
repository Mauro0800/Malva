const { literal } = require('sequelize');

const literalQueryUrlImage = (
    req, // Petición
    nameImage, // Nombre de la imágen
    field, // Campo
) => {
    const urlImage = (req) =>
        `${req.protocol}://${req.get("host")}/users/images/`; // Protocolo (https://) - Dominio (Ej: malva.com) - "/users/images/" - Nombre de la imágen
    return [literal(`CONCAT('${urlImage(req)}',${nameImage})`), field];
};

module.exports = literalQueryUrlImage;