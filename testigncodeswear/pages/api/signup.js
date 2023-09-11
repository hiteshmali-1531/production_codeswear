
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");
require('dotenv').config()

const handler = async(req,res) =>{

    if(req.method == 'POST'){
       
            
            let p = new User({
                name : req.body.name,
                email : req.body.email,
                password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
                
            });
            await p.save();
        
        res.json({sucess: "success"});
    }else{
        res.status(400).json({
            error: "This method is not allowed"
        })
    }
}

export default connectDb(handler)
