import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';


const Nav = () => {
  
  return (
    <div className='nav-div'>
      <div className="navlogo-div">
        <img src={logo} alt="" className='h-10' />
        <h1 className="text-xl font-bold text-iconblue">Health Plum</h1>
      </div>
      <div class="flex gap-10 logobuttons items-center">
        <Link className="text-iconblue text-sm font-normal" to={"/login"}>Login</Link>
        <Link className='btn' to={"/register"}>Register</Link>
      </div>
      <div className='hides'>
        <IoMenu className='text-3xl text-[#606060]'/>
      </div>
    </div>
  )
}

export default Nav
