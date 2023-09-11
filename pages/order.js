import React, { useEffect } from 'react'
import mongoose from 'mongoose';
import Order from '../models/Order'
import { useRouter } from 'next/router';

function Orders({ subTotal, orders, clearCart }) {
     const router = useRouter();
    // const router = useRouter()
    // const {id} = router.query;
    // console.log(id)
    useEffect(() =>{
        if(router.query.clearcart == 1){
            clearCart();
        }
    },[])
    console.log(orders)

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-5 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h1 className="font-bold  text-xl my-4 text-black">My OrdersS</h1>
                        <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">CODESWEAR.COM</h2>
                        <h1 className="text-gray-900 text-3xl  title-font font-medium mb-4">Order Id: {orders.orderid}</h1>
                        <div className="flex my-2  mb-4">
                            <span className="w-1/2 font-bold text-lg text-gray-500">Item Description</span>
                            <span className="mx-auto font-bold text-lg text-gray-900">Quntity</span>
                            <span className="mx-auto font-bold text-lg text-gray-900">ItemTotal</span>
                        </div>

                     
        
                        {Object.keys(orders.products).map((item) => {




                           return  <div key={item} className="flex border-t border-gray-200 py-2">
                                <span className="text-gray-500 w-1/2">{orders.products[`${item}`].name} ({orders.products[`${item}`].size}, {orders.products[`${item}`].variant})</span>
                                <span className="mx-auto text-gray-900">{orders.products[`${item}`].qty}</span>
                                <span className="mx-auto text-gray-900">₹{orders.products[`${item}`].price*orders.products[`${item}`].qty }</span>
                            </div>



                        })}
                       

                        <div className="flex">
                            <span className="title-font font-medium my-3 text-2xl text-gray-900" style={{padding: '0 0'}}>SubTotal : ₹{orders.amount}</span>

                        </div>
                        <div className="my-4">

                            <button className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps(context) {
    let orders = {};
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    try {


        orders = await Order.findById({ _id: context.query.id });
    } catch (error) {
        console.log(error);
    }





    // console.log(Mugs);
    return {
        props: { orders: JSON.parse(JSON.stringify(orders)) }
    }
}

export default Orders;
