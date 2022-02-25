const express = require("express");

const { UsersController } = require("./controller");

const router = express.Router();

module.exports.UsersAPI = aplicacion =>{
    router
    .get('/', UsersController.getUsers)
    .get('/:id', UsersController.getUser)
    .post('/', UsersController.createUser)
    .put('/', UsersController.updateuser)
    .delete('/:id', UsersController.deleteUser)

    aplicacion.use('/api/users', router);
}