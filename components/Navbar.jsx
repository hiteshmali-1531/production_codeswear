import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import '../pages/globals.css'

import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'


function Navbar({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) {
  const [showSideBar, setShowSideBar] = useState(false);

  // console.log(localStorage.getItem('token'));
  useEffect(() =>{

    if(localStorage.getItem('token')){
      setShowSideBar(true);
    }
  },[])
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  }
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const toggleCart = () => {
    // console.log("toogle cart");
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0');

    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove('translate-x-0');
      ref.current.classList.add('translate-x-full');

    }
  }

  const ref = useRef();
  return (
    <div className="flex navbar flex-col md:flex-row  justify-start shadow-xl items-center py-2 sticky top-0 z-10 bg-white">
      <div className="logo sm:mr-auto md:mx-0">
        <Link href={'/'} className="cursor-pointer" ><Image width={50} height={50} src="/next.svg" className="h-6 my-2 mx-3" alt='No image' ></Image></Link>
      </div>
      <div className="nav">
        <ul className="flex mx-5 font-bold items-center space-x-4  md:text-md ">
          <Link href={'/tshirts'}><li className='hover:text-pink-600'>Tshirts</li></Link>
          <Link href={'/hoodies'}><li className='hover:text-pink-600'>Hoodies</li></Link>
          <Link href={'/stickers'}><li className='hover:text-pink-600'>Stickers</li></Link>
          <Link href={'/mugs'}><li className='hover:text-pink-600'>Mugs</li></Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 top-2 flex items-center"  >
        {dropdown &&
          <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-5   bg-white shadow-lg top-7 px-5 rounded-md w-[14vw] py-4 font-bold">
            <ul>
              <Link href={'/myaccount'} ><li className="py-1 text-m hover:text-pink-500  ">My Account</li></Link>
              <Link href={'/orders'} ><li className="py-1 text-m hover:text-pink-500  ">Orders</li></Link>
              <li onClick={logout} className="py-1 text-m hover:text-pink-500  ">Logout</li>

            </ul>
          </div>}

        {user.value && <MdAccountCircle onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="text-xl md:text-3xl cursor-pointer" />}
        {!user.value &&
          <Link href={'/login'}>
            <button className="bg-pink-600 px-4 py-2 mx-2 rounded-md  text-sm  text-white font-bold">Login</button>
          </Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-3xl cursor-pointer" />
      </div>
      <div ref={ref} className={`w-72 sidebar overflow-y-scroll absolute top-0 right-0  h-[100vh] bg-pink-200  py-10 px-8 transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className="font-bold text-center">Shopping cart</h2>
        <span className="absolute top-0 right-3" onClick={toggleCart}>
          <AiFillCloseCircle className="text-3xl text-pink-700 " />
        </span>
        <ol className="list-decimal font-semibold">
          {
            Object.keys(cart).length === 0 &&
            <div className="my-4 text-base font-semibold">Your cart is Empty</div>
          }
          {
            !Object.keys(cart).length === 0&&!showSideBar &&
            <div className="my-4 text-base font-semibold">Your cart is Empty</div>
          }

          { showSideBar &&Object.keys(cart).map((k) => {
            return  <li key={k}>
              <div className="item flex my-3">

                <div className="w-2/3 ">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                <div className="w-1/3 flex font-semibold  items-center justify-center text-xl ">
                  <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className=" flex text-pink-700 font-bold cursor-pointer   items-center justify-center " />
                  <span className="mx-3">{cart[k].qty}</span>
                  <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className=" flex text-pink-700 font-bold cursor-pointer items-center justify-center " /></div>
              </div>
            </li>
          })}


        </ol>
        {
          showSideBar&&
            <span className="font-bold block my-3">subTotal : ₹{subTotal}</span>
        }
        <div className="flex ">

          <Link href={'/checkout'}>
            <button disabled={Object.keys(cart).length == 0 } className="flex mr-2   text-white bg-pink-500  py-2 px-4 focus:outline-none hover:bg-pink-600 rounded disabled:bg-pink-300"><BsFillBagCheckFill className="m-1" />Checkout</button>
          </Link>
          <button disabled={Object.keys(cart).length == 0} className="flex mr-2  text-white disabled:bg-pink-300 bg-pink-500  py-2 px-4 focus:outline-none hover:bg-pink-600 rounded " onClick={clearCart}>ClearCart</button>
        </div>

      </div>


    </div>
  )
}

export default Navbar
