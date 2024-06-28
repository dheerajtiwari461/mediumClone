import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

// importing schema
import User from "./Schema/User.js";


const server = express();
let PORT = /*process.env.PORT ||*/ 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION,{
    autoIndex: true,
})

const generateUsername = async (email) => {
    const [username] = email.split('@');
    const isUsernameNotUnique = await User.exists({ "personal_info.username": username });
    return isUsernameNotUnique ? `${username}${nanoid(5)}` : username;
}


server.post("/signup", (req,res)=>{
    let {fullname, email, password} = req.body; 

    // validating the data from frontend
    if(fullname.length < 3){
        return res.status(403).json({"error": "fullname must be at least 3 letters long"});
    }
    if (!email.length) {
        return res.status(403).json({"error": "Enter a valid email"});
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error": "Email is invalid"});

    }
    if (!passwordRegex.test(password)) {
        return res.status(403).json({"error": "Password should be 6 to 20 characters long and should contain atleast one number, one uppercase and one lowercase character"});
    }
    
    // hashing the password
    bcrypt.hash(password, 10, async (err, hashed_password)=>{
        let username = await generateUsername(email);
        
        let user = new User({
            personal_info: {
                fullname,
                email,
                password: hashed_password,
                username
            }
        })

        user.save().then((u)=>{

            return res.status(200).json({user: u});
        })
        .catch(err=>{

            if(err.code == 11000){
                return res.status(500).json({"error": "Email already exists"});
            }

            return res.status(500).json({"error": err.massage})
        })
       
        
    })

})



server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})

