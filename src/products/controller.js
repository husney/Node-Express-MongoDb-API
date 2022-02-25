
const { ProductsService } = require("./services");
const debug = require("debug")("app:productsController");
const { Response } = require("../common/response");
const httpError = require("http-errors");

module.exports.ProductsController = {

    getProducts: async  (req, res) =>{
        try{
            let products =  await ProductsService.getAll();
            //res.json(products);
            Response.success(res, 200, "Productos", products);
        }catch(error){
            debug(error);
            //res.status(500).json({"message": "Error al consultar los productos"});
            Response.error(res);
        }
    }, 

    getProduct: async  (req, res) => {
        try{
            const { params: { id } } = req;
            const product = await ProductsService.getById(id);
            //return res.json(product);
            if(product){
                Response.success(res, 200, `Producto ${id}`, product);
            }else{
                Response.error(res, new httpError.NotFound(), "Producto no encontrado");
            }
            

        }catch(error){
            debug(error);
            //res.status(500).json({"message": "Error al consultar los producto"});
            Response.error(res);
        }
    },

    createProduct: async (req, res) => {
        try{
            const { body } = req;

            if(!body || Object.keys(body).length == 0){
                Response.error(res, new httpError.BadRequest());
                return;
            }

            let id = await ProductsService.create(body);
            //res.json(id);
            Response.success(res, 200, "Producto creado", id);

        }catch(error){
            debug(error);
            //res.status(500).json("message", "Error al crear producto");
            Response.error(res);
        }
    },

    deleteProduct: async (req, res) => {
        const { params: { id } } = req;

        try{
            let info = await ProductsService.deleteProduct(id);
            Response.success(res, 200, info);
        }catch{
            Response.error(res);
        }

    },

    updateProduct: async (req, res) => {
        const { body } = req;

        if(!body || Object.keys(body).length == 0){
            Response.error(res);
        }

        let info = await ProductsService.update(body);

        Response.success(res, 200, info);
    },

    generateReport: async (req, res) => {

        try{
            ProductsService.generateReport("Inventario", res);
        }catch{
            Response.error(res);
        }
    }
    
}