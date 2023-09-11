
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import { useEffect } from "react";
const CryptoJS = require("crypto-js");
require('dotenv').config()
const jwt = require("jsonwebtoken");


const handler = async(req,res) =>{
   
    let user = await User.findOne({email: req.body.email});
    
    if(req.method == 'POST'){
        let email ;
        let password ;
        let name ;
        if(user){

            email = user.email;
            password = user.password;
            name = user.name;
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);    
            // console.log(decryptedPass);
            // console.log(req.body.password);
            if(req.body.email === email && req.body.password ==  decryptedPass){
                let token = jwt.sign({success : true, email: user.email, name: user.name}, process.env.JWT_SECRET);
     
                // res.status(200).json({sucess: true, email, name});
                res.status(200).json({sucess: true,token});
            }else{
                res.status(400).json({sucess : false, error : "invalid login details"});
            } 
        }else{
            res.status(400).json({sucess : false, error : "No user Found"});
            
        }
    }else{
        res.status(400).json({
            error: "This method is not allowed"
        })
    }
}

export default connectDb(handler)
