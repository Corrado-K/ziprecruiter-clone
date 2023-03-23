import React from 'react'

const JobApplicantsTable = () => {


     return (
          <div className='bg-gray-200 p-4 rounded-lg'>
               <div className="flex items-center">
                    <h4 className='font-semibold'>TODAY'S APPOINTMENTS</h4>
               </div>

               <div className="">
                    <table className="border-collapse w-full mt-4">
                         <thead>
                              <tr className='text-white bg-[#1a7460]'>
                                   <th className='p-3 border border-gray-300 text-left'>Name</th>
                                   <th className='p-3 border border-gray-300 text-left'>Email</th>
                                   <th className='p-3 border border-gray-300 text-left'>Cover letter</th>
                                   <th className='p-3 border border-gray-300 text-left'>CV</th>
                                   <th className='p-3 border border-gray-300 text-left'></th>
                              </tr>
                         </thead>
                         <tbody>
                              <tr className='hover:bg-[#f0fffd] odd:bg-[#eeeeee] even:bg-[#e3edea]'>
                                   <td className='p-3 border border-gray-300 text-sm'>Emmanuel Kebede Martey</td>
                                   <td className='p-3 border border-gray-300 text-sm'>kebemartey@gmail.com</td>
                                   <td className='p-3 border border-gray-300 text-sm'>Cover letter file_name</td>
                                   <td className='p-3 border border-gray-300 text-sm'>CV file_name</td>
                                   <td className='p-3 border border-gray-300 text-sm text-right'>
                                        <span className='mr-3 text-sky-400 underline cursor-pointer'>Hire</span>                                   
                                        <span className='mr-3 text-gray-400 underline cursor-pointer'>Keep Pending</span>                                   
                                        <span className='mr-3 text-red-400 underline cursor-pointer'>Reject</span>                                   
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>
          </div>
     )
}

export default JobApplicantsTable