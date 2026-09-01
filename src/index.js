import dotenv from "dotenv";
import connectDB from "./db/index.js";
dotenv.config({
    path:'./.qenv'
})

connectDB()
    .then(()=>{
        app.listen(process.env.PORT || 8000, ()=> {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    })

    .catch((err)=> {
        console.log("DB connection error!!",err);
    });