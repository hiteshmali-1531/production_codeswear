import React, {useEffect} from 'react'
import { MdAccountCircle } from 'react-icons/md'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Forgot() {
    let router = useRouter();
  

  useEffect(() =>{
      if(localStorage.getItem('token')){
          router.push('/');
      }
  }, []);
    return (
        <section className="bg-white light:bg-white-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


                <div className="w-full bg-white rounded-lg shadow white:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <MdAccountCircle className="text-xl md:text-8xl cursor-pointer mx-auto text-white my-4" />
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Forgot Password
                        </h1>
                        <span>Or</span><Link href={'/login'} className="text-pink-600 mx-2 font-semibold" >Login</Link>

                        <form className="space-y-4 md:space-y-6" action="#" method="POST">
                            
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                           
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">


                                </div>

                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Continue</button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Forgot
