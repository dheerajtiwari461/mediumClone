import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const server = express();
let PORT = /*process.env.PORT ||*/ 3000;

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION,{
    autoIndex: true,
})

server.post("/signup", (req,res)=>{
    
})



server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

