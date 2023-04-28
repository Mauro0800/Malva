const { literal } = require('sequelize');

const literalQueryDetailUrl = (
    req, // Petición
    id, // ID de producto
    field, // Campo
) => {
    const urlDetail = (req) =>
        `${req.protocol}://${req.get('host')}/users/detail/`; // Protocolo (https://) - Dominio (Ej: malva.com) - "/users/detail/" - Nombre de la imágen
    return [literal(`CONCAT('${urlDetail(req)}',${id})`), field];
};

module.exports = literalQueryDetailUrl;