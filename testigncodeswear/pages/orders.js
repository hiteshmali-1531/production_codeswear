import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// import mongoose from 'mongoose';
// import Order from '../models/Order'
import { useRouter } from 'next/router';
// import Link from 'next/link';

function Orders({ subTotal}) {
  const [order, setOrder] = useState([])
  const router = useRouter()
  const { id } = router.query;

 
  
  
  useEffect(() => {
    const fetchOrders = async() =>{
      const token = localStorage.getItem("token");
      console.log(token);
      // token = JSON.stringify(token);
      
  
      let a = await fetch('http://localhost:3000/api/myorders',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
      });
      const data = await a.json();
      // console.log(data) 
      setOrder(data);
    }
    if (!localStorage.getItem('token')) {
      router.push('/');
    }else{
      fetchOrders();
      
      // console.log(order)
    }
  }, []);
  
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="overflow-x-scroll  w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 className="font-bold text-xl my-4 text-black">My Orders</h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
            <h1 className="text-gray-900 text-3xl  title-font font-medium mb-4">Order Id: #897777</h1>
            
             
              <div  className="flex border-t border-gray-200 py-2">
              <span className="text-gray-500  md:w-1/4 text-center "> # </span>
              <span className="md:w-1/4 mx-3 text-center text-gray-900">Email</span>
              <span className="mx-3 text-gray-900 text-center md:w-1/4">Amount</span>
              <span  className="mx-3 text-gray-900 text-center md:w-1/4">Details</span>
            </div>
           

          
            {
              order.map((item) =>{
                return <div key={item._id} className="flex border-t border-gray-200 mx-auto py-2">
              <span className="text-gray-500 mx-3 md:w-1/4 text-center"> {item.orderid} </span>
              <span className="mx-3 text-gray-900 md:w-1/4 text-center">{item.email}</span>
              <span className="mx-3 text-gray-900 md:w-1/4 text-center">{item.amount}</span>
              <Link href={`/order?id=${item._id}`} className="mx-3 md:w-1/4 text-center text-gray-900">Details</Link>
            </div>
              })
            }
            
           
           
          </div>
          
        </div>
      </div>
    </section>
  )
}


export default Orders;
