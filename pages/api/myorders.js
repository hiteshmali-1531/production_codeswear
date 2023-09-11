import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import jwt from 'jsonwebtoken';
 
const handler = async(req,res)=>{
    const token = req.body.token;
    console.log(req.body)
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data);
    // res.json(data)
    const info = await Order.find({email: data.email})
    res.json(info);

}


export default connectDb(handler);