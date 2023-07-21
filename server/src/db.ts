import { Db, MongoClient } from "mongodb";
let dbConnection: Db

export const connectToDB = async (callback:Function) => {
    try{
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017/')
        dbConnection = client.db()
        return callback()
    }catch(error){
        console.log(error)
        return callback(error)
    }
};

export const getDB = () => {
    return dbConnection
};
