const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");
const { ProductsUtil } = require("./utils");

const PRODUCTS_COLLECTION = "products"

const getAll = async () =>{
    const collection = await Database(PRODUCTS_COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async id =>{
    const collection = await Database(PRODUCTS_COLLECTION);
    return await collection.findOne({ _id : ObjectId(id) });
}

const create = async product =>{
    const collection = await Database(PRODUCTS_COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId
}

const update = async(product) => {
    const collection = await Database(PRODUCTS_COLLECTION);

    const id = product._id;

    const filter = { _id : ObjectId(id) };

    delete product._id;

    product = {
        ...product
    };

    return await collection.updateOne(
        filter,
        {$set: {...product}},
        {upsert: true}
    );
    
}

const deleteProduct = async id =>{
    const collection = await Database(PRODUCTS_COLLECTION);
    
    const query = { _id: ObjectId(id) };

    const result = await collection.deleteOne(query);

    if(result.deletedCount === 1){
        return `El producto con id ${id} ha sido eliminado`;
    }else{
        return `Error al eliminar el producto`;
    }

}

const generateReport = async (name, res) =>{
    let productsInfo = await getAll();
    return ProductsUtil.excelGenerator(productsInfo, name, res);
}

module.exports.ProductsService = {
    getAll: getAll,
    getById: getById,
    create: create,
    deleteProduct: deleteProduct,
    update: update,
    generateReport: generateReport
}