import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <div className='py-4 flex justify-between max-[500px]:justify-end max-[500px]:pr-2 items-center'>
           <div className='hidden md:block '>
                <p className='md:text-sm text-xs  text-gray-600 2xl:text-lg'>Hi, Stevan Dux</p>
                <h1 className='font-semibold text-xl hidden md:block'>Welcome Back</h1>
           </div>
           <div className='flex bg-gray-100 h-fit center self-center px-2 py-1 rounded-md gap-2 max-[500px]:hidden'> 
                <label htmlFor="doctorsearch" className='center'>             
                    <IoIosSearch className='text-xl cursor-pointer'/>
                    <input type="text" id='doctorsearch' placeholder="Find a Doctor " className='text-md text-gray-600 bg-gray-100 outline-none border-none py-1 rounded-md xl:w-[300px] lg:w-[250px] w-[150px] px-2' />
                </label> 
                <label htmlFor="location" className='center'>
                    <CiLocationOn className='text-xl cursor-pointer'/>
                    <input type="text" id='location' placeholder="Location"className='text-md text-gray-600 bg-gray-100 outline-none border-none py-1 rounded-md xl:w-[100px]  w-[80px] px-2' />
                </label>
                <div>
                    <button className='btn'>Search</button>
                </div>
           </div>

           <div className='center lg:gap-4 gap-2 max-[500px]:hidden'>
                <div>
                    <a href=""><IoIosNotificationsOutline className='text-3xl' /></a>
                </div>
                <a className='center gap-2' href=''>
                    <div className='h-12 w-12 rounded-full border-2 profile-pic'></div>
                    <Link to={'/user/profile'} className='hidden lg:block 2xl:text-lg'>Stevan Dux</Link>
                </a>
           </div>
           <IoIosMenu className='text-3xl max-[500px]:block hidden' />
        </div>
    </div>
  )
}

export default React.memo(Navbar);
