import React from 'react'

const General = () => {
  return (
    <div className='mt-4 flex flex-col gap-4'>
        <div className='flex justify-between border-2 items-center p-4 rounded-lg'>
        <div className='middle gap-10'>
            <div className='w-[80px] h-[80px] rounded-full profile-pic'></div>
            <div >
                <h1 className='text-md'>Stevan Dux</h1>
                <p className='text-gray-700 text-xs'>Gastro Doctor</p>
                <p className='text-gray-700 text-xs'>India</p>
            </div>
        </div>
        <button className='gray-btn h-fit text-sm'>Edit</button>
        </div>

        <div className='flex flex-col gap-2 border-2 p-4 rounded-lg'>
        <div className='flex  justify-between'>
            <h1 className='text-md font-medium text-gray-700 '>Personal Information</h1>
            <button className='gray-btn h-fit text-sm'>Edit</button>
        </div>
        <div className='flex lg:gap-44 md:gap-20 gap-4'>
            <div>
            <p  className='text-sm text-gray-700 max-[500px]:text-xs'>Name</p>
            <p className='text-sm '>Steven Dux</p>
            <div className='mt-2'>
                <p className='text-sm text-gray-700 max-[500px]:text-xs'>Phone Number</p>
                <p className='text-sm'>988376587</p>
            </div>
            </div>
            <div>
            <p className='text-sm text-gray-700 max-[500px]:text-xs'>Date of Birth</p>
            <p className='text-sm '>03/04/1996</p>
            <div className='mt-2'>
                <p className='text-sm text-gray-700 max-[500px]:text-xs'>Email Address</p>
                <p className='text-sm '>abc@gmail.com</p>
            </div>
            </div>
            <div>
            <p className='text-sm text-gray-700 max-[500px]:text-xs'>Age</p>
            <p className='text-sm '>56</p>
            <div className='mt-2'>
                <p className='text-sm text-gray-700 max-[500px]:text-xs'>Bio</p>
                <p className='text-sm'>Gastro Doctor</p>
            </div>
            </div>
        </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
        <h1 className='text-md font-medium text-gray-700'>Pre-existing Diseases</h1>
        <div className="flex flex-col">
            <div className='h-[60px] flex flex-col justify-center'>
            <p className='text-sm text-gray-500'>Speech</p>
            <p className='text-xs text-gray-700 bg-gray-100 w-fit p-1 rounded-lg'>None</p>                  
            </div>
            <div className='h-[60px] flex flex-col justify-center'>
            <p className='text-sm text-gray-500'>Speech</p>
            <p className='text-xs text-gray-700 bg-gray-100 w-fit p-1 rounded-lg'>None</p>                  
            </div>
        </div>
        </div>

        <div className='border-2 rounded-lg p-4'>
            <h1 className='text-md text-gray-700'>General</h1>
            <div className='flex items-center gap-8'>
            <p className='text-sm'>Change Password</p>
            <button className='gray-btn text-xs'>Change</button>
            </div>
        </div>
  </div>
  )
}

export default General
