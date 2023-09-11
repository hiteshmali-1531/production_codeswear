import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";


const handler = async(req, res)=>{

    let order = await Order.findOne({orderid: req.body.txnRes.response.orderid});
    // console.log(req.body.txnRes.response.orderid)
    console.log(order);

    let product = order.products;
    for(let item in product){
        await Product.findOneAndUpdate({slug: item},{$inc :{availableQty: -product[item].qty}})
    }


    res.status(200).json({body: req.body});
    // res.json({data : "data"});

}



export default connectDb(handler);

