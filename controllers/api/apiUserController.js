const db = require('../../database/models')

const { getAllUsers,  getUserById } = require('../../services/userServices')


module.exports = {
    index: async (req, res) => {
        try {

            const users = await getAllUsers(req);
            return res.status(200).json({
                ok: true,
                count: users.length,
                users 

            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Ocurrio un error"
                }
            })
        }
    },
    detail : async (req,res) =>{
        try {

            const user = await getUserById(req.params.id);
            return res.status(200).json({
                ok: true,
                count: user.length,
                user

            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Ocurrio un error"
                }
            })
        }
    }
}


    /*db.User.findAll()
.then(user => {
let detail = []
    user.forEach(user => {
        detail.push({
        id : user.id,
        name : user.name + " " + user.surname,
        email : user.email,
        detail : "http://localhost:2023/api/users/" + user.id,
        })
    })

    return res.status(200).json({
        name: "Total de Usuarios",
        count :  user.length,
        users : detail,
        status : 200  
    })
})
 
},
detail : (req, res) => {
db.User.findByPk(req.params.id)
    .then(user => {
        return res.status(200).json({
            Name: user.name,
            surname: user.surname,
            Email: user.email,
            rolId: user.rolId,
            address: user.addressId,
            image: "http://localhost:2023/" + user.image,
            status: 200
        })
    })
}
}*/
