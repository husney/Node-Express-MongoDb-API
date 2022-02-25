const express = require("express");

const { SalesController } = require("./controller");

const router = express.Router();

module.exports.SalesAPI = aplicacion => {

    router
    .get('/', SalesController.getSales)
    .get('/:id', SalesController.getSale)
    .post('/', SalesController.createSale)
    .put('/', SalesController.updateSale)
    .delete('/:id', SalesController.deleteSale)

    aplicacion.use('/api/sales', router);
}