const db = require('../database/models');
const user = require('../database/models/user');
const { literalQueryUrlImage, literalQueryDetailUrl } = require('../helpers');

module.exports = {
    getAllUsers : async (req)  =>{
        try{
            const users = await db.User.findAll({
                /*include: [{
                   
                }]*/
                attributes: {
                    exclude: [ 'password'], // Excluye  password
                     include: [literalQueryDetailUrl(req,'id', 'detailUrl'), literalQueryUrlImage(req, 'image', 'imageUrl')] 
                 }
            })
            return users;
        }
        catch(error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    },
    getUserById :  async (id) => {
        try{
            const user = await db.User.findByPk(id, {
                
                    attributes: {
                        exclude: ['password'], // Excluye fecha de creación y actualización
                       
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