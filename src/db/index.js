import mongoose from "mongoose";
import DB_NAME from "../constant.js";
const connetDB = async()  => {
        try{
            const connectionInstance = await mongoose.connect(`${process.env.Mongo_URL}/${DB_NAME}`)
            console.log(`Mongodb connected!!, connetion host:${connectionInstance.connect.host}`);
        } catch(error){
            console.log("MONGODB connection error",error);
            process.exit(1);
        }
}

export default connetDB;