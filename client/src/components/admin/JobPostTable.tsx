import React from 'react'

const JobPostTable = () => {
     return (
          <div className='bg-gray-200 p-4 rounded-lg'>
               <div className="flex items-center">
                    <h4 className='font-semibold'>TODAY'S APPOINTMENTS</h4>
               </div>

               <div className="">
                    <table className="border-collapse w-full mt-4">
                         <thead>
                              <tr className='text-white bg-[#1a7460]'>
                                   <th className='p-3 border border-gray-300 text-left'>Title</th>
                                   <th className='p-3 border border-gray-300 text-left'>Description</th>
                                   <th className='p-3 border border-gray-300 text-left'>Location</th>
                                   <th className='p-3 border border-gray-300 text-left'>Experience</th>
                                   <th className='p-3 border border-gray-300 text-left'>Applications Received</th>
                                   <th className='p-3 border border-gray-300 text-left'>...</th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr className='hover:bg-[#f0fffd] odd:bg-[#eeeeee] even:bg-[#e3edea]'>
                                   <td className='p-3 border border-gray-300 text-sm'>Title</td>
                                   <td className='p-3 border border-gray-300 text-sm'>Description</td>
                                   <td className='p-3 border border-gray-300 text-sm'>Location</td>
                                   <td className='p-3 border border-gray-300 text-sm'>Experience</td>
                                   <td className='p-3 border border-gray-300 text-sm'>Applications Received</td>
                                   <td className='p-3 border border-gray-300 text-sm text-right'>
                                        <span className='mr-3 text-sky-400 underline cursor-pointer'>Edit</span>                                   
                                        <span className='mr-3 text-red-400 underline cursor-pointer'>Delete</span>                                   
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

export default JobPostTable