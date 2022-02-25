const express = require("express");

const { ProductsController } = require("./controller");

const router = express.Router();

module.exports.ProductsAPI = aplicacion =>{
    router
    .get('/', ProductsController.getProducts)
    .get('/report', ProductsController.generateReport)
    .get('/:id', ProductsController.getProduct)
    .delete('/:id', ProductsController.deleteProduct)
    .put('/', ProductsController.updateProduct)
    .post('/', ProductsController.createProduct)

    aplicacion.use('/api/products', router);

};