const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");


const SALES_COLLECTION = "sales";

const getAll = async () => {
    const collection = await Database(SALES_COLLECTION);
    return await collection.find({}).toArray();
}

const getSale = async id => {
    const collection = await Database(SALES_COLLECTION);
    return await collection.findOne({ _id: ObjectId(id)});
}

const create = async sale => {
    const collection = await Database(SALES_COLLECTION);
    return await collection.insertOne(sale).insertedId;
}

const update = async sale => {
    const collection = await Database(SALES_COLLECTION);

    const id = sale._id;

    const filter = { _id : ObjectId(id)};

    delete sale._id;

    return await collection.updateOne(
        filter,
        { $set: {...sale}},
        {upsert: true}
    );
}

const deleteSale = async id => {
    const collection = await Database(SALES_COLLECTION);

    const query = { _id : ObjectId(id)};

    const result = await collection.deleteOne(query);

    if(result.deletedCount == 1)
        return `La venta con id ${id} ha sido eliminada.`;
    else
        return `Error al eliminar la venta.`;
}

module.exports.SalesService = {
    getAll: getAll,
    getSale : getSale,
    create : create,
    update : update,
    deleteSale : deleteSale
}