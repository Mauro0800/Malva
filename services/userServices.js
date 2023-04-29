const db = require('../database/models');
const { literalQueryUrlImage, literalQueryUrlDetail } = require('../helpers');

module.exports = {
    getAllUsers : async (req)  =>{
        try{
            const {count, rows : users} = await db.User.findAndCountAll({
                include: [
                    {
                        association: "address",
                        attributes:["address"]
                    },
                    {
                        association: "rol",
                        attributes:["name"]
                    }
                ],
                attributes: {
                    exclude: [ 'password','createdAt','updatedAt','rolId','image'],
                     include: [literalQueryUrlDetail(req,'user.id','urlDetail'), literalQueryUrlImage(req, 'image', 'urlImage')] 
                 }
            })
            return {
                count,
                users
            };
        }
        catch(error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            };
        }
    },
    getUserById :  async (id,req) => {
        try{
            const user = await db.User.findByPk(id, {
                
                    attributes: {
                        exclude: ['password','createdAt','updatedAt','rolId','image'], // Excluye fecha de creación y actualización
                        include:[literalQueryUrlImage(req, 'image', 'urlImage')]
                    }
               
            })
            return user
        }
        catch(error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    }
}