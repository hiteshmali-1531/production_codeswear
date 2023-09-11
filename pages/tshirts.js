import React from 'react'
import mongoose from 'mongoose';
import Link from 'next/link'
import Product from '../models/Product';
// import connectDb from "../middleware/mongoose";
function Tshirts({json}) {
  // console.log(json);
  
  return (
    <>
      <section className="text-gray-600 body-font md:mx-20 ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap  -m-auto">
            {
              Object.keys(json).map((item) =>{

              return <div key={json[item]._id} className="d-flex justify-center lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg  ">
            <Link href={`/product/${json[item].slug}`} className=" shadow-lg">
               
                  <img alt="ecommerce" className="  m-auto w-[80vw] md:h-[56vh] block sm:w-[60vw]" src={json[item].img} />
                
                <div className="text-center mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{json[item].title}</h2>
                  <p className="mt-1">₹{json[item].price}</p>
                  <div className="mt-1">
                   {json[item].size.includes('S') && <span className="border border-grey-300 px-1 mx-1">S</span>}
                   {json[item].size.includes('M') && <span className="border border-grey-300 px-1 mx-1">M</span>}
                   {json[item].size.includes('L') && <span className="border border-grey-300 px-1 mx-1">L</span>}
                   {json[item].size.includes('XL') && <span className="border border-grey-300 px-1 mx-1">XL</span>}
                   {json[item].size.includes('XXL') && <span className="border border-grey-300 px-1 mx-1">XXL</span>}
                   </div>
                   <div className="mt-1 flex">
                      {json[item].color.includes('red') &&  <button className="mx-1 border-2 border-grey-300 rounded-full bg-red-700 w-6 h-6 focus:outline-none"></button>}
                      {json[item].color.includes('blue') &&  <button className="mx-1 border-2 border-red-300 rounded-full bg-blue-700 w-6 h-6 focus:outline-none"></button>}
                      {json[item].color.includes('black') &&  <button className="mx-1 border-2 border-red-300 rounded-full bg-black w-6 h-6 focus:outline-none"></button>}
                      {json[item].color.includes('green') &&  <button className="mx-1 border-2 border-red-300 rounded-full bg-green-700 w-6 h-6 focus:outline-none"></button>}
                      {json[item].color.includes('yellow') &&  <button className="mx-1 border-2 border-red-300 rounded-full bg-yellow-500 w-6 h-6 focus:outline-none"></button>}
                      {json[item].color.includes('purple') &&  <button className="mx-1 border-2 border-red-300 rounded-full bg-purple-700 w-6 h-6 focus:outline-none"></button>}
                      
                      
                   </div>
                </div>
            </Link>
              </div>
              })
            }          
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context){
  // const response = await fetch("http://localhost:3000/api/getproduct");
  if(!mongoose.connections[0].readyState){
    
    await mongoose.connect(process.env.MONGO_URI);
  }
    
  let response = await Product.find({category: "tshirts"});
  let tshirts = {}
    for(let item of response){
        if(item.title in tshirts){
            if(!tshirts[item.title].color.includes(item.color) && item.availableQty > 0){
                tshirts[item.title].color.push(item.color);

            }
            if(!tshirts[item.title].size.includes(item.size) && item.availableQty >0 ){
                tshirts[item.title].size.push(item.size);
            }
        }else{
          if(item.availableQty > 0){
              tshirts[item.title] = JSON.parse(JSON.stringify(item));
                tshirts[item.title].color = [item.color];
                tshirts[item.title].size = [item.size];
            }
        }
    }
  // response = JSON.parse(response)
  // console.log(response);
  // const json = JSON.parse(response);
  // console.log(json)
  return {
    props: {json : JSON.parse(JSON.stringify(tshirts))},
  }
}

export default Tshirts
