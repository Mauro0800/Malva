/* const { literal } = require('sequelize');

const literalQueryUrlImage = (
    req, // Petición
    nameImage, // Nombre de la imágen
    field, // Campo
    pathRoute = req.baseUrl // Ruta = Petición de baseUrl
) => {
    const urlImage = (req) =>
        `${req.protocol}://${req.get('host')}/images/products/`; // Protocolo (https://) - Dominio (Ej: malva.com) - /images/products/
    return [literal(`CONCAT('${urlImage(req)}',${nameImage})`), field];
};

module.exports = literalQueryUrlImage; */