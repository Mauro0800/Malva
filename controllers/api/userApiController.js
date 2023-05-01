const { getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../../services/userServices')
const errorResponse = require('../../helpers/errorResponse')
const { validationResult } = require('express-validator');


module.exports = {
    index: async (req, res) => {
        try {

            const {count,users} = await getAllUsers(req);
            return res.status(200).json({
                ok: true,
                data: {
                    count,
                    users
                }
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Hubo un error"
                }
            })
        }
    },
    detail : async (req,res) =>{
        try {

            const user = await getUserById(req.params.id,req);
            return res.status(200).json({
                ok: true,
                user
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Hubo un error"
                }
            })
        }
    },
    register: async (req,res) => {
        try {
            const errors = validationResult(req);

        if (errors.isEmpty()) throw {
            status: 400,
            message: errors.mapped()
        }
            const newUser = await createUser(req.body);
            const user = await getUserById(newUser.id,req);

            return res.status(200).json({
                ok:true,
                data: user,
                meta:{
                    status:200,
                    total:1,
                    url:`/api/users/${newUser.id}`,
                }
            })

        } catch (error) {
            return errorResponse(res,error)
        }
    },
    update: async (req,res) => {
        try {
            const {id} = req.params;
            await updateUser(id,req);
            const user = await getUserById(id,req);

            return res.status(200).json({
                ok:true,
                data: user,
                meta:{
                    status:200,
                    total:1,
                    url:`/api/users/${id}`,
                }
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss. Error!!"
                }
            })
        }
    },
    destroy: async (req,res) => {
        try {
            const {id} = req.params;
            await deleteUser(id)

            return res.status(200).json({
                ok:true,
                data: `El usuario ${id} ha sido eliminado`,
                meta:{
                    status:200,
                    total:1,
                    url:`/api/users/${id}`,
                }
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss. Hubo error!!"
                }
            })
        }
    }
}