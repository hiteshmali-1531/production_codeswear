import App from 'next/app'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router' 
import LoadingBar from 'react-top-loading-bar'

 
export default function MyApp({ Component, pageProps, example }) {
  
  const router = useRouter();
  const [cart , setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value: null});
  let [progress, setProgress] = useState(0)
  const [ key, setKey] = useState()
  
  useEffect(() =>{
    router.events.on('routeChangeComplete', (() =>{
      setProgress(100);
    })) 
    router.events.on('routeChangeStart', (() =>{
      setProgress(40);
    })) 
    // console.log("hey I am useEffect");
    try {
      
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error); // TODO
    }

    const token = localStorage.getItem("token");
    if(token){
      setUser({value: token});
      setKey(Math.random())
    }
  
  },[router.events, router.query])

  const saveCart =(myCart) =>{
    localStorage.setItem('cart', JSON.stringify(myCart));

    let subt = 0;
    let keys = Object.keys(myCart);
    for(let i =0 ; i< keys.length; i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  const buyNow = (itemCode, qty, price , name, size, variant) =>{
    let newCart =  {slug: {qty: 1, price, name, size, variant}};
    newCart = {};
    
    saveCart({});
    
    setCart(newCart);
    // console.log(newCart);
    saveCart(newCart);

    router.push('/checkout');
   }
  const addToCart = (itemCode, qty, price , name, size, variant) =>{
    let myCart = cart;
    if(itemCode in cart){
      myCart[itemCode].qty = cart[itemCode].qty + qty; 
    }else{
      myCart[itemCode] = {qty:1, price, name, size, variant, itemCode};

    }
    setCart(myCart);
    saveCart(myCart);
    // console.log(cart);
    // console.log(subTotal);
  }

  const clearCart = () =>{
    setCart({}); // setCart is request not order so cart either update or not updated
    saveCart({});
  }

  const removeFromCart = (itemCode, qty, price , name, size, variant) =>{
    // console.log(itemCode);
    let myCart = cart;
    if(itemCode in myCart){
      myCart[itemCode].qty = myCart[itemCode].qty - qty;
    }

    if(myCart[itemCode].qty <= 0){
      delete myCart[itemCode];
    }

    setCart(myCart);
    saveCart(myCart);
  }

  const logout = () =>{
    localStorage.removeItem('token');
    setCart({});
    saveCart({});

    setKey(Math.random())
    setUser({value: null})
    router.push('/');
  }
  return (
    <>
    <LoadingBar
       
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
        waitingTime={1000}
      />
    <div className="relative w-[100vw] overflow-x-hidden ">
      <Head>
        <title>Codeswear.com - wear the code</title>
      </Head>
      <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} />
      <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} buyNow={buyNow} {...pageProps} />
      <Footer />
    </div>
    </>
  )
}
 
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context)
 
  return { ...ctx, example: 'data' }
}