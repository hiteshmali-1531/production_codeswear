import Razorpay from "razorpay";
import Order from "../../models/Order";


export default async function handler(req, res) {
    try {
        // console.log(process.env.RAZO_ID )
        // console.log(process.env.RAZO_SECRET)
        var instance = new Razorpay({ key_id: process.env.RAZO_ID, key_secret: process.env.RAZO_SECRET })
        // console.log(amount)

        var options = {
            amount: Number.parseInt(req.body.subTotal)*100,  // amount in the smallest currency unit
            currency: "INR",


        };
        let x = await instance.orders.create(options);
        await Order.create({
            email: req.body.email,
            orderid: x.id,
            products:req.body.cart,
            address: req.body.address,
            amount: req.body.subTotal
        })




        x = JSON.parse(JSON.stringify(x))
        res.json({ success: true, x });
    } catch (e) {
        console.log(e)
        // e = JSON.parse(JSON.stringify(e))
        res.json({ success: false, e })
    }
}
