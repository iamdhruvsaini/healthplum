import React from 'react'
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Upcoming = () => {
  return (
      <ul className='flex flex-col gap-4'>
        <li className=' rounded-lg p-2 flex flex-col gap-1 bg-gray-100'>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-normal'>Date: 10 Nov 2024</p>
                <Link className='text-xs gray-btn'>View Details</Link>
            </div>
            <div className='middle gap-6'>
                <div className='middle gap-4'>
                    <div className='w-[50px] h-[50px] rounded-full bg-gray-100'></div>
                    <p className='text-md font-normal'>Jane Cuper</p>
                </div>

                <button><IoDocumentTextOutline /></button>
            </div>
            <p className='py-1 bg-gray-50 text-sm text-iconblue rounded-lg px-4'>7:00am - 8:00am</p>

        </li>
        <li className=' rounded-lg p-2 flex flex-col gap-1 bg-gray-100'>
            <div className='flex justify-between items-center'>
                <p className='text-sm font-normal'>Date: 10 Nov 2024</p>
                <Link className='text-xs gray-btn'>View Details</Link>
            </div>
            <div className='middle gap-6'>
                <div className='middle gap-4'>
                    <div className='w-[50px] h-[50px] rounded-full bg-gray-100'></div>
                    <p className='text-md font-normal'>Jane Cuper</p>
                </div>

                <button><IoDocumentTextOutline /></button>
            </div>
            <p className='py-1 bg-gray-50 text-sm text-iconblue rounded-lg px-4'>7:00am - 8:00am</p>

        </li>
      </ul>
  )
}

export default Upcoming
