const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config()
// console.log(dotenv);

// console.log(process.env.MONGO_URI);
const connectDb = handler => async(req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res);
    }
    await mongoose.connect(process.env.MONGO_URI);
    return handler(req,res);
}

export default connectDb;