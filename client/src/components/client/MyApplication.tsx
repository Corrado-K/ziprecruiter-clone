import React from 'react'
import {BsFileEarmarkText} from 'react-icons/bs'

const MyApplication = () => {
     return (
          <div className='px-8 py-5 bg-white shadow-lg rounded-lg flex justify-between'>
               {/* icon and job title */}
               <div className='flex items-center space-x-5'>
                    <span className='p-4 bg-[#1a7460] rounded-full'>
                         <BsFileEarmarkText color='#fff' size={30} />
                    </span>
                    <div>
                         <h2 className='text-lg font-semibold'>Job title</h2>
                         <p className='text-sm'>Experience</p>
                    </div>
               </div>
               {/* date of application & status */}
               <div className='flex flex-col justify-center text-right space-y-1'>
                    <p className='text-sm'>26/03/2023</p>
                    <p>PENDING</p>
               </div>
          </div>
     )
}

export default MyApplication