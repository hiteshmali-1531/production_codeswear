import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from 'mongoose'


function Hoodies({products}) {
  // console.log(products);
  return (
   
      <section className="text-gray-600 body-font  md:mx-20">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
          {Object.keys(products).length ===0 && <p>Sorry all the Hoodies are currently out of stock New stock coming soon</p>}
            {
              Object.keys(products).map((item) =>{

            return <div key={products[item].slug} className="d-flex justify-center lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg my-3 mx-0">
                <Link href={`/product/${products[item].slug}`} className="shadow-lg">
                
                    <img alt="ecommerce" className="  m-auto w-[80vw]  md:h-[40vh] sm:w-[60vw] block" src={products[item].img} />
                  
                  <div className="text-center mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Hoodies</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                     {products[item].size.includes('S') && <span className="border border-grey-300 px-1 mx-1">S</span>}
                     {products[item].size.includes('M') && <span className="border border-grey-300 px-1 mx-1">M</span>}
                     {products[item].size.includes('L') && <span className="border border-grey-300 px-1 mx-1">L</span>}
                     {products[item].size.includes('XL') && <span className="border border-grey-300 px-1 mx-1">XL</span>}
                     {products[item].size.includes('XXL') && <span className="border border-grey-300 px-1 mx-1">XXL</span>}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes('red') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-red-700 w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('green') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-green-700 w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('yellow') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-yellow-500 w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('blue') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-blue-700 w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('purple') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-purple-700 w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('black') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-black w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              </div>          
              })
            }
          </div>
        </div>
      </section>
    
  )
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category: 'hoodies'});
  let hoodies = {};
  for(let item of products){
    if(item.title in hoodies){
      if(!hoodies[item.title].color.includes(item.color) && item.availableQty >0){
        hoodies[item.title].color.push(item.color)
      }

      if(!hoodies[item.title].size.includes(item.size) && item.availableQty > 0){
        hoodies[item.title].size.push(item.size);
      }
    }else{
      if(item.availableQty > 0){
        hoodies[item.title] = JSON.parse(JSON.stringify(item));
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];

      }
    }
  }
  // console.log(hoodies);
  return {
    props: {products: JSON.parse(JSON.stringify(hoodies))}
  }
}

export default Hoodies
