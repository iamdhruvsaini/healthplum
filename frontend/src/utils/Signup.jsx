import React from 'react'
import signImage from '../assets/images/signup.svg'
import { IoIosClose } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import {Link} from "react-router-dom"

const Signup = () => {
  return (
    <section className='center h-dvh gap-4 px-3 sm:px-0'>

      <div>

        <Link to={"/"} className='flex justify-end'>
          <IoIosClose className='text-3xl mb-2 self-end'/>
        </Link>

        <div className='center gap-4'>
          
          <img src={signImage} alt="" className='block max-[850px]:hidden h-[600px]' />

          <div className="flex flex-col w-[90vw] sm:w-auto sm:h-auto">

              <div className='flex flex-col gap-4'>
                <h1 className='text-center text-2xl font-semibold'>Hey there</h1>
                <p className='text-center text-sm'>Already Know HealthPlum ? <span><a href="" className='text-iconblue'>Log In</a></span></p>
              
                <form action="" className='w-full sm:w-[400px] flex flex-col gap-6 '>

                  <div className='flex flex-col'>
                    <label htmlFor="email" className='text-xs text-gray-700'>Email Address</label>
                    <input type="email" name="email" id="email" className='outline-none border-2 rounded-md p-2 text-sm' required/>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="phone" className='text-xs text-gray-700'>Phone Number</label>
                    <input type="tel" name="phone" id="phone" className='outline-none border-2 rounded-md p-2 text-sm' required/>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="password" className='text-xs text-gray-700'>Password</label>
                    <input type="password" name="password" id="password" className='outline-none border-2 rounded-md p-2 text-sm' required/>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor="birthDate" className='text-xs text-gray-700'>Birth Date</label>
                    <input type="date" name="birthDate" id="birthDate" className='outline-none rounded-md p-2 text-sm border-2'  required/>
                  </div>

                  <button className='btn'>Sign Up</button>
                </form>

                <div className='flex flex-col gap-4'>
                  <p className='text-xs'>or sign up with</p>
                  <div className='flex justify-evenly'>
                    <button className='px-3 py-2 border-2 rounded-md outline-none'>
                      <FcGoogle className='text-5xl' />
                    </button>
                    <button className='px-3 py-2 border-2 rounded-md outline-none'>
                      <FaFacebook  className='text-5xl text-blue-600' />
                    </button>
                    <button className='px-3 py-2 border-2 rounded-md outline-none'>
                      <IoLogoApple className='text-5xl text-gray-400' />
                    </button>
                  </div>
                </div>
              </div>
          </div>

        </div>

      </div>
      
    </section>
  )
  
}

export default Signup
