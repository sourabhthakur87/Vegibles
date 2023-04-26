const dotenv = require("dotenv")
const express = require("express");
const app = express();
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
dotenv.config({path:"./.env"})

app.use(cookieparser())
app.use(express.json())

app.use(require("./Routes/routers"))

const DB = process.env.DATABASE;
mongoose.set("strictQuery", true);
try {
   const connection =  mongoose.connect(DB)

   if (connection) {
        console.log("Database Connection Success");
   }
   else{
    console.log("Database Connection Error");
   }

} catch (error) {
    console.log(`Connection Error ${error}`);
}


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT);
})