import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import Head from 'next/head'
// import Script from 'next/script'
// import axios from 'axios';
import { Router, useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import Product from '../models/Product'
// import jwt from 'jsonwebtoken'

function Checkout({ cart, addToCart, removeFromCart, clearCart, subTotal }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [disable, setDisable] = useState(true);
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [token, setToken] = useState("");
    const[cartItem, setCartItem] = useState();
    // console.log(data);

  
    const fetchData = async (token) => {
        console.log(cartItem);
        if(cartItem == "{}"){
            console.log('hello')
        }else{
            console.log("note")
        }
        // console.log(token);
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/accountdetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })
        const json = await a.json();
        // console.log(json.data.email);
        setEmail(json.data.email);
    }
    useEffect(() => {
        let tokens = localStorage.getItem("token");
        setCartItem(localStorage.getItem("cart"));
        setToken(tokens);
        // token  = JSON.parse(token);
        // console.log(tokens)
        // console.log(process.env.NEXT_PUBLIC_JWT_SECRET)
        setTimeout(() => {

            fetchData(tokens);
        }, 1000)
        // console.log(token);
        // const data =  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
        // console.log(data)
    }, [])
    const initiatePayment = async () => {
        // let txnToken;

        let oid = Math.floor(Math.random() * Date.now());

        //Get a transaction token 
        const data = {
            cart,
            subTotal, oid, email,
            address, pincode, phone, token, pincode
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let txnRes = await a.json();
        console.log(txnRes)
        console.log(txnRes.response)
        if (txnRes.success) {
            // await Product.findOne()
            let res= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
                ,
                body: JSON.stringify({txnRes: txnRes})
            })
            res = await res.json();

            // console.log(res);
            // clearCart();
            router.push(`/order?id=${txnRes.response._id}&clearcart=1`);
        }else{
          
            // clearCart();
            toast.error(`${txnRes.errore}`, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }




        //


        // txnToken = txnRes.txnToken;
        // var config = {
        //     "root": "",
        //     "flow": "DEFAULT",
        //     "data": {
        //         "orderId": oid, /* update order id */
        //         "token": txnToken, /* update token value */
        //         "tokenType": "TXN_TOKEN",
        //         "amount": subTotal /* update amount */
        //     },
        //     "handler": {
        //         "notifyMerchant": function (eventName, data) {
        //             console.log("notifyMerchant handler function called");
        //             console.log("eventName => ", eventName);
        //             console.log("data => ", data);
        //         }
        //     }
        // };


        // initialze configuration using init method
        // window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        //     // after successfully updating configuration, invoke JS Checkout
        //     window.Paytm.CheckoutJS.invoke();
        // }).catch(function onError(error) {
        //     console.log("error => ", error);
        // });


    }





    const onChange = async (e) => {

        // console.log(e.target.name);
        // console.log("onChange");
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "address") {
            setAddress(e.target.value);
        } else if (e.target.name === "pincode") {
            setPincode(e.target.value);
            if (e.target.value.length == 6) {
                // console.log(pinjson)
                let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
                let pinJson = await pins.json();
                if (Object.keys(pinJson).includes(e.target.value)) {
                    setState(pinJson[e.target.value][1]);
                    setCity(pinJson[e.target.value][0]);
                } else {
                    setState('');
                    setState('');
                }

            } else {
                setState('');
                setCity('');
            }
            // console.log(pincode.length);
            // console.log(pincode);
        }



        if (name && email && phone && email && address && pincode) {
            setDisable(false);
            console.log(disable)
        } else {
            // console.log(disable)
            setDisable(true);
        }
    }

    // const initiatePayment = async () => {
    //    let res = await fetch('http://localhost:3000/api/instamojo');
    //    let json = await res.json();
    //    console.log(json)
    // }
    return (
        <div className="container w-[90vw] m-auto">
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            {/* <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous"></Script>
            <Script src="https://d2xwmjc4uy2hr5.cloudfront.net/im-embed/im-embed.min.js"></Script> */}
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h1 className="font-bold text-xl text-center my-8">Checkout</h1>
            <h2 className="font-bold text-xl my-3">1. Delivery Details </h2>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 font-bold text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name"
                            onChange={onChange} value={name}
                            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 font-bold text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email"
                            // onChange={onChange}
                            value={email} readOnly={true}
                            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="px-2 w-full">
                <div className="mb-4">
                    <label htmlFor="address" className="leading-7 font-bold text-sm text-gray-600">Address</label>
                    <textarea type="text" id="address" name="address" cols={10} rows={5}
                        onChange={onChange} value={address}
                        className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="phone" className="leading-7 font-bold text-sm text-gray-600">10 Digit Phone Number</label>
                        <input type="number" id="phone" name="phone"
                            placeholder='Your 10 digit Phone Number' onChange={onChange} value={phone}
                            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">

                    <div className="mb-4">
                        <label htmlFor="pinCode" className="leading-7 font-bold text-sm text-gray-600">pinCode</label>
                        <input type="text" id="pinCode" name="pincode"
                            onChange={onChange} value={pincode}
                            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex">
                <div className="px-2 w-1/2">
                    <div className=" mb-4">
                        <label htmlFor="state" className="leading-7 font-bold text-sm text-gray-600">State</label>
                        <input type="text" value={state} id="state" name="state" readOnly={true}
                            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 font-bold text-sm text-gray-600">City</label>
                        <input type="text" value={city} id="city" name="city" readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <h2 className="font-bold text-xl my-3">2. Review Cart Items </h2>

            <div className=" sidebar   bg-pink-200  py-10 px-8 ">


                <ol className="list-decimal font-semibold">
                    {
                        Object.keys(cart).length === 0 &&
                        <div className="my-4 text-base font-semibold">Your cart is Empty</div>
                    }
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-3">

                                <div className=" w-1/3">{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                                <div className="w-1/3 flex font-semibold  items-center justify-center text-xl ">
                                    <AiFillMinusCircle onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className=" flex text-pink-700 font-bold cursor-pointer   items-center justify-center " />
                                    <span className="mx-3">{cart[k].qty}</span>
                                    <AiFillPlusCircle onClick={() => addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className=" flex text-pink-700 font-bold cursor-pointer items-center justify-center " /></div>
                            </div>
                        </li>
                    })}


                </ol>
                <span className="total block my-3 font-bold">Subtotal :  ₹{subTotal}</span>


            </div>
            <div className="mx-4 my-2">
                <Link href={'/checkout'} >
                    {cartItem ==  "{}"? <button
                        disabled={true}
                        onClick={initiatePayment} className="flex mr-2   text-white bg-pink-500  py-2 px-4 disabled:bg-pink-300 focus:outline-none hover:bg-pink-600 rounded ">Pay  ₹ {subTotal}</button>:<button
                        disabled={disable}
                        onClick={initiatePayment} className="flex mr-2   text-white bg-pink-500  py-2 px-4 disabled:bg-pink-300 focus:outline-none hover:bg-pink-600 rounded ">Pay  ₹ {subTotal}</button> }
                </Link>
            </div>
        </div>
    )
}



export async function getServerSideProps(context) {
    // let token = localStorage.getItem("token");
    // console.log(token)
    // console.log(process.env.NEXT_PUBLIC_JWT_SECRET)
    // console.log(token);
    // const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
    // console.log(data);

    return {
        props: {
            token: "data"
        }
    }
}

export default Checkout
