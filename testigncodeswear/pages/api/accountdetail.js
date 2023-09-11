import jwt from 'jsonwebtoken';


export default async function handler(req,res){
    console.log(req.body.token)
    const data = jwt.verify(req.body.token, process.env.JWT_SECRET);
    // res.status(200).json(data)
    res.json({data : data, token : req.body.token})
}