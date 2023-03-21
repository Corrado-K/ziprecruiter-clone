import React from 'react'
import JobApplicantsTable from '../../components/admin/JobApplicantsTable'

export const ApplicantsPage = () => {
     return (
          <div className="w-full flex flex-col">
               <div className='p-10'>
                    <h1 className='mb-10'>Applicants</h1>
                    <div className='bg-zinc-200 p-8 py-8 rounded-lg mb-10 flex items-center justify-between'>
                         <div className='flex items-baseline'>
                              <h1 className='font-semibold text-4xl'>8</h1>
                              <span className='font-normal text-2xl ml-4'>applicants</span>
                         </div>
                         {/* <button className='py-2 px-6 text-white font-semibold rounded-xl shadow-lg shadow-gray-300 hover:scale-110 bg-[#24ac8f] hover:bg-[#1a7460]'>New post</button> */}
                    </div>
                    <div className=''>
                         <JobApplicantsTable />
                    </div>
               </div>
          </div>     
     )
}
