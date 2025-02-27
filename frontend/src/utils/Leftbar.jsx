import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { IoCalendarClearOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogin } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io"

import logo from '../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';

const Leftbar = (props) => {
    
    return (
        <div className='top-0 absolute xl:static w-[54px] h-dvh shadow-md sm:w-[160px] lg:w-[200px] overflow-hidden'>
            <div className='center mt-6'>
                <img src={logo} alt="" className='h-[40px] '/>
                <h1 className="hidden lg:block text-xl font-bold text-iconblue">Health Plum</h1>
            </div>
            <div className='lefticons flex flex-col items-center justify-center h-[70vh] gap-10 sm:gap-8 lg:gap-8 xl:gap-10 mt-8 '>
                
                
                <NavLink to={'/user/dashboard'}  className='list-none sm:flex sm:justify-start sm:items-center sm:w-[140px] lg:w-[180px] sm:py-2 sm:pl-4 lg:pl-8 sm:rounded-lg gap-2 outline-none'>
                    <RxDashboard className='icon text-3xl sm:text-xl 2xl:text-2xl text-gray-700 '/>
                    <span className='hidden sm:block sm:text-md xl:text-lg 2xl:text-xl'>Dashboard</span>
                </NavLink>
                
                
                <NavLink to={'/user/calendar'} className='list-none sm:flex sm:justify-start  sm:items-center sm:w-[140px] lg:w-[180px] sm:py-2 sm:pl-4 lg:pl-8 sm:rounded-lg gap-2 outline-none'>
                    <IoCalendarClearOutline className='icon text-3xl sm:text-xl 2xl:text-2xl text-gray-700 '/>
                    <span className='hidden sm:block sm:text-md xl:text-lg 2xl:text-xl'>Calendar</span>
                </NavLink>
                
                    
              
                    <NavLink to={'/user/profile'}  className='list-none sm:flex sm:justify-start sm:items-center sm:w-[140px] lg:w-[180px] sm:py-2 sm:pl-4 lg:pl-8 sm:rounded-lg gap-2 outline-none'>
                        <CgProfile className='icon text-3xl sm:text-xl 2xl:text-2xl text-gray-700'/>
                        <span className='hidden sm:block sm:text-md xl:text-lg 2xl:text-xl'>Profile</span>
                    </NavLink>
               
                    
           
                    <NavLink to={'/user/help'}  className='list-none sm:flex sm:justify-start sm:items-center sm:w-[140px] lg:w-[180px] sm:py-2 sm:pl-4 lg:pl-8 sm:rounded-lg gap-2 outline-none'>
                        <IoMdHelpCircleOutline className='icon text-3xl sm:text-xl 2xl:text-2xl text-gray-700'/>
                        <span className='hidden sm:block sm:text-md xl:text-lg 2xl:text-xl'>Help</span>
                    </NavLink>
               
                    
             
                    <NavLink to={'/user/logout'}  className='list-none sm:flex sm:justify-start sm:items-center sm:w-[140px] lg:w-[180px] sm:py-2 sm:pl-4 lg:pl-8 sm:rounded-lg  gap-2 outline-none'>
                        <CiLogin className='icon text-3xl sm:text-xl text-gray-700 2xl:text-2xl'/>
                        <span className='hidden sm:block sm:text-md xl:text-lg 2xl:text-xl'>Logout</span>
                    </NavLink>    
             
            </div>
        </div>
    )
}

export default React.memo(Leftbar);
