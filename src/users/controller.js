const { UsersService } = require("./services");
const debug = require("debug")("app:usersController");
const { Response } = require("../common/response");
const httpError = require("http-errors");

module.exports.UsersController = {
    getUsers: async (req, res) => {
        try{
            let users = await UsersService.getAll();

            Response.success(res, 200, "Usuarios", users);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    },

    getUser: async (req, res) => {
        try{

            const { params : {id} } = req;

            const user = await UsersService.getById(id);

            if(user){
                Response.success(res, 200, `Usuario ${id}`, user);
            }else{
                Response.error(res, new httpError.NotFound(), "Usuario no encontrado");
            }
            
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },

    createUser: async (req, res) => {
        try{

            const { body } = req;

            if(!body || Object.keys(body).length == 0){
                Response.error(res, new httpError.BadRequest());
            }

            let id = await UsersService.createUser(body);
            
            Response.success(res, 200, "Usuario creado", id);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    },

    deleteUser: async (req, res) => {
        try{

            const { params: { id } } = req;

            let info = await UsersService.deleteUser(id);

            Response.success(res, 200, info);

        }catch(error){
            debug(error);
            Response.error(res)
        }
    },

    updateuser: async (req, res) => {
        try{

            const { body } = req;

            if(!body || Object.keys(body).length === 0){
                Response.error(res);
            }

            let info = await UsersService.updateUser(body);

            Response.success(res, 200, info);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    }

}
