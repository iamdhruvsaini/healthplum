import React from 'react'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import Cards from "../../../utils/Cards"
import poster from "../../../assets/images/poster.png"
import location1 from "../../../assets/images/location1.png"


const UserContent = () => {
  return (
    <section className='content h-[calc(100vh-88px)] w-full flex flex-col gap-4'>
      <div className='flex flex-col lg:flex-row justify-between gap-4 '>

        <div className='flex flex-col justify-between'>

          <img src={poster} alt="" className='w-full' />

          <div className='lg:flex flex-col gap-2 w-full mt-2 hidden'>
            <div className='center justify-between'>
              <h1 className='text-md font-semibold'>Nearby Doctors</h1>
              <button className='text-xs text-green-400 font-semibold middle'>View All <FaAngleRight/></button>
            </div>

            <div className='w-full h-[128px] flex items-end justify-between'>

              <div className='flex flex-col gap-2 border-2 h-fit rounded-md p-2'>
                <div className='middle gap-4 border-b-2 p-2'>
                  <img src={location1} alt="" />
                  <div>
                    <p className='text-md font-medium'>Aline Cavino</p>
                    <p className='text-xs text-gray-700'>Heart Health</p>
                  </div>
                </div>

                <div className='text-gray-700 text-sm justify-center middle gap-2'>
                  <CiLocationOn className='text-lg'/>
                  <p>Rua Savador 57, Balgra</p>
                </div>

              </div>

              <div className='flex flex-col gap-2 border-2 h-fit rounded-md p-2'>
                <div className='middle gap-4 border-b-2 p-2'>
                  <img src={location1} alt="" />
                  <div>
                    <p className='text-md font-medium'>Aline Cavino</p>
                    <p className='text-xs text-gray-700'>Heart Health</p>
                  </div>
                </div>

                <div className='text-gray-700 text-sm justify-center middle gap-2'>
                  <CiLocationOn className='text-lg'/>
                  <p>Rua Savador 57, Balgra</p>
                </div>

              </div>

              <div className='flex flex-col gap-2 border-2 h-fit rounded-md p-2'>
                <div className='middle gap-4 border-b-2 p-2'>
                  <img src={location1} alt="" />
                  <div>
                    <p className='text-md font-medium'>Aline Cavino</p>
                    <p className='text-xs text-gray-700'>Heart Health</p>
                  </div>
                </div>

                <div className='text-gray-700 text-sm justify-center middle gap-2'>
                  <CiLocationOn className='text-lg'/>
                  <p>Rua Savador 57, Balgra</p>
                </div>

              </div>
              
            </div>
            

          </div>
        </div>
        {/* Calendar */}
        <div className='w-full lg:w-[340px] border-2 p-4 flex flex-col gap-4 rounded-lg'>
            
            <div className='center justify-between pl-2'>
              <h1 className='text-md font-semibold'><span className='hidden'>Upcoming</span> Appointments</h1>
              <button className='text-xs text-green-400 font-semibold center'>View All <FaAngleRight/></button>
            </div>

            <div className='middle gap-4 py-2 pl-2 bg-gray-200 rounded-md'>
              <h1 className='text-sm font-medium'>June 2023</h1>
              <div>
                <button className='text-xs outline-none border-none'><FaAngleLeft/></button>
                <button className='text-xs outline-none border-none'><FaAngleRight/></button>
              </div>
            </div>
            
            <ul className='content flex flex-col gap-2 list-none h-[200px] lg:h-[280px]'>
              <li className='middle gap-8 pl-2 py-2 bg-red-50 rounded-md'>
                <div className='w-[50px] h-[50px] rounded-md bg-white flex flex-col justify-center items-center'>
                  <p className='text-xs text-gray-700'>Fri</p>
                  <p className='text-md font-medium'>14</p>
                </div>
                <div>
                  <p className='text-sm'>Dr. Ashton Cleve</p>
                  <p className='text-xs text-gray-700'>10:00am - 10:30am</p>

                </div>
              </li>
              <li className='middle gap-8 pl-2 py-2 bg-green-50 rounded-md'>
                <div className='w-[50px] h-[50px] rounded-md bg-white flex flex-col justify-center items-center'>
                  <p className='text-xs text-gray-700'>Fri</p>
                  <p className='text-md font-medium'>14</p>
                </div>
                <div>
                  <p className='text-sm'>Dr. Ashton Cleve</p>
                  <p className='text-xs text-gray-700'>10:00am - 10:30am</p>

                </div>
              </li>
              <li className='middle gap-8 pl-2 py-2 bg-green-50 rounded-md'>
                <div className='w-[50px] h-[50px] rounded-md bg-white flex flex-col justify-center items-center'>
                  <p className='text-xs text-gray-700'>Fri</p>
                  <p className='text-md font-medium'>14</p>
                </div>
                <div>
                  <p className='text-sm'>Dr. Ashton Cleve</p>
                  <p className='text-xs text-gray-700'>10:00am - 10:30am</p>

                </div>
              </li>
              <li className='middle gap-8 pl-2 py-2 bg-green-50 rounded-md'>
                <div className='w-[50px] h-[50px] rounded-md bg-white flex flex-col justify-center items-center'>
                  <p className='text-xs text-gray-700'>Fri</p>
                  <p className='text-md font-medium'>14</p>
                </div>
                <div>
                  <p className='text-sm'>Dr. Ashton Cleve</p>
                  <p className='text-xs text-gray-700'>10:00am - 10:30am</p>

                </div>
              </li>
              <li className='middle gap-8 pl-2 py-2 bg-green-50 rounded-md'>
                <div className='w-[50px] h-[50px] rounded-md bg-white flex flex-col justify-center items-center'>
                  <p className='text-xs text-gray-700'>Fri</p>
                  <p className='text-md font-medium'>14</p>
                </div>
                <div>
                  <p className='text-sm'>Dr. Ashton Cleve</p>
                  <p className='text-xs text-gray-700'>10:00am - 10:30am</p>

                </div>
              </li>
              <li className='middle gap-8 pl-2 py-2 bg-green-50 rounded-md'>
                <div className='w-[50px] h-[50px] rounded-md bg-white flex flex-col justify-center items-center'>
                  <p className='text-xs text-gray-700'>Fri</p>
                  <p className='text-md font-medium'>14</p>
                </div>
                <div>
                  <p className='text-sm'>Dr. Ashton Cleve</p>
                  <p className='text-xs text-gray-700'>10:00am - 10:30am</p>

                </div>
              </li>

            </ul>
        </div>

      </div>
      <Cards/>
    </section>
  )
}

export default UserContent
