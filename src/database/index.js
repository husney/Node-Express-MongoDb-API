const { MongoClient } = require("mongodb");
const debug = require("debug")("app:database");

const { Config } = require("../config/index");

let connection = null;

module.exports.Database = data => new Promise( async (resolve, reject) =>{
    
    //Patron singleton
    
    try{
        if(!connection){
            const client = new MongoClient(Config.mongoUri);
            connection = await client.connect();
            debug("Conexión a mongodb realizada");
        }

        const db = connection.db(Config.mongoDbName);
        resolve(db.collection(data));

    }catch(error){
        reject(error);
    }
});
