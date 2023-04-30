const db = require('../database/models');
const { validationResult } = require('express-validator');
const { hashSync } = require('bcryptjs');
const { literalQueryUrlImageUser, literalQueryUrlDetailUser } = require('../helpers');

module.exports = {
    getAllUsers: async (req) => {
        try {
            const { count, rows: users } = await db.User.findAndCountAll({
                include: [
                    {
                        association: "address",
                        attributes: ["address"]
                    },
                    {
                        association: "rol",
                        attributes: ["name"]
                    }
                ],
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'rolId', "addressId", 'image'],
                    include: [literalQueryUrlDetailUser(req, 'user.id', 'urlDetail'), literalQueryUrlImageUser(req, 'image', 'urlImage')]
                }
            })
            return {
                count,
                users
            };
        }
        catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            };
        }
    },
    getUserById: async (id, req) => {
        try {
            const user = await db.User.findByPk(id, {
                include: [
                    {
                        association: "address",
                        attributes:{
                            exclude:['id','createdAt', 'updatedAt']
                        }
                    },
                    {
                        association: "rol",
                        attributes:["name"]
                    }
                ],
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'rolId', 'image','addressId'], // Excluye fecha de creación y actualización
                    include: [literalQueryUrlImageUser(req, 'image', 'urlImage')]
                }

            })
            return user
        }
        catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    createUser: async (data) => {
        try {

            const { name, surname, email, password } = data;
            const address = await db.Address.create();

            const newUser = await db.User.create({
                name: name.trim(),
                surname: surname.trim(),
                email: email.trim(),
                password: hashSync(password, 12),
                image: 'default-image.jpg',
                rolId: 2,
                addressId: address.id
            });

            return newUser;

        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    updateUser: async (id,req) => {
        try {

            const { name, surname, address, city, province, zipCode } = req.body

            const user = await db.User.findByPk(id)

            const addressUpdated = await db.Address.update(
                {
                    address: address ? address.trim() : address,
                    city: city ? city.trim() : city,
                    province: province ? province.trim() : province,
                    zipCode: zipCode ? zipCode : zipCode
                },
                {
                    where: {
                        id: user.addressId
                    }
                }
            )
            const userUpdated = await db.User.update(
                {
                    name: name ? name.trim() : name,
                    surname: surname ? surname.trim() : surname,
                    image: req.file ? req.file.filename : user.image
                },
                {
                    where: {
                        id
                    }
                }
            )

            return userUpdated;

        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    deleteUser: async (id) => {
        try {
            const deletedUser = db.User.destroy(
                {
                    where: {id}
                }
            )

            return deletedUser
            
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    }
}