const express = require("express");
const debug = require("debug")("app:server");

const { Config } = require("./src/config/index");
const { ProductsAPI } = require("./src/products/index");
const { UsersAPI } = require("./src/users/index");
const { SalesAPI } = require("./src/sales/index");
const { IndexAPI, NotFoundAPI } = require("./src/index/index");

const app = express();

app.use(express.json()); // Permite que el servidor haga uso del request.body

IndexAPI(app);
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app);

app.listen(Config.port, () =>{
    debug(`El servidor está funcionando en el puerto ${Config.port}`);
});