import React, {useEffect} from 'react'
import { useRouter } from 'next/router';

function Myaccount() {
    const router = useRouter()
    useEffect(() =>{
        if(!localStorage.getItem('token')){
            router.push('/');
        }
    },[]);
  return (
    <div>
      My account
    </div>
  )
}

export default Myaccount
