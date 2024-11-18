import Razorpay from "razorpay";
import Order from "../../models/Order";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";



// import { redirect } from "next/dist/server/api-utils";

export default async function handler(req,res){
    try{
    // console.log(req.body);
    

    let body = req.body
    // body = Object.fromEntries(body);
    // let data = await req.body.formData();
    
    // let body = Object.fromEntries(req.body);
    body = JSON.parse(JSON.stringify(body))

    const resp = await Order.findOne({orderid:body.razorpay_order_id});
    if(!resp){
        return res.json({success: false, message:"Order is not found"})
    }

    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id,"payment_id":body.razorpay_payment_id }, body.razorpay_signature, process.env.RAZO_SECRET);

    if(xx){

        await Order.findOneAndUpdate({orderid:body.razorpay_order_id},{status: "done",paymentinfo:"paid", deliveryStatus:"shipped"});
        // return res.redirect()
        return res.redirect(`${process.env.HOST}/checkout?paymentdone=true`)
        // return res.json({m:`${process.env.HOST}/checkout?paymentdone=true`})
        // return res.json({success: true, message: "payment verified"})

    }else{
        return res.json({success: false, message: "payment verification failed"})
    
    }

    

    
    }catch(e){
        console.log(e)
        return res.json({success: false, message: "some errore occured"})
    }
    }