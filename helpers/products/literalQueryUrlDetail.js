const { literal } = require('sequelize');

const literalQueryUrlDetail = (
    req, // Petición
    id, // ID de producto
    field, // Campo
) => {
    const urlDetail = (req) =>
        `${req.protocol}://${req.get('host')}/products/detail/`; // Protocolo (https://) - Dominio (Ej: malva.com) - "/products/detail/" - Nombre de la imágen
    return [literal(`CONCAT('${urlDetail(req)}',${id})`), field];
};

module.exports = literalQueryUrlDetail;