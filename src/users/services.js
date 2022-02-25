const { Database } = require("../database/index");
const { ObjectId } = require("mongodb");

const USER_COLLECTION = "users";

const getAll = async () =>{
    const collection = await Database(USER_COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async id =>{
    const collection = await Database(USER_COLLECTION);
    return await collection.findOne({_id: ObjectId(id)});
}

const createUser = async user =>{
    const collection = await Database(USER_COLLECTION);
    return await collection.insertOne(user).InsertedId;
}

const updateUser = async user =>{
    const collection = await Database(USER_COLLECTION);

    const id = user._id;

    const filter = { _id : ObjectId(id)}

    delete user._id;    

    user = {
        ...user
    };

    console.log(user);

    return result = await collection.updateOne(
        filter,
        {$set: {...user}},
        {upsert: true}
    );
}

const deleteUser = async id =>{
    const collection = await Database(USER_COLLECTION);

    const query = { _id: ObjectId(id) };

    const result = await collection.deleteOne(query);

    if(result.deletedCount === 1)
        return `El usuario con el id ${id} ha sido eliminado.`;
    else
        return `Error al eliminar el usuario`;
}

module.exports.UsersService = {
    getAll : getAll,
    getById : getById,
    createUser : createUser,
    updateUser : updateUser,
    deleteUser : deleteUser    
}