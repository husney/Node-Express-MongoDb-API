const { SalesService } = require("./services");
const debug = require("debug")("app:salesController");
const { Response } = require("../common/response");
const httpError = require("http-errors");

module.exports.SalesController = {

    getSales: async (req, res) => {
        try{

            let sales = await SalesService.getAll();

            Response.success(res, 200, "Ventas", sales);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    },

    getSale: async (req, res) => {
        try{

            const { params: { id } }  = req;

            const sale = await SalesService.getSale(id);

            Response.success(res, 200, `Venta ${id}`, sale);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    },

    createSale: async (req, res) => { 
        try{
            const { body } = req;

            if(!body || Object.keys(body).length == 0){
                Response.error(res, new httpError.BadRequest());
                return;
            }

            let id = await SalesService.create(body);

            Response.success(res, 200, "Venta creada", id);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    
    updateSale: async (req, res) => {
        try{

            const { body } = req;

            if(!body || Object.keys(body).length == 0){
                Response.error(res, new BadRequest());
                return;
            }

            let info = await SalesService.update(body);

            Response.success(res, 200, info);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    
    deleteSale: async (req, res) => {
        try{

            const { params: { id } } = req;

            let info = await SalesService.deleteSale(id);

            Response.success(res, 200, info);

        }catch(error){
            debug(error);
            Response.error(res);
        }
    }
}

