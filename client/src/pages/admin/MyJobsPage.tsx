import React from 'react'
import JobPostTable from '../../components/admin/JobPostTable'
import { useNavigate, Outlet } from 'react-router-dom';

export const MyJobsPage = () => {

     const navigator = useNavigate()

     const handleClick = () => {
          navigator(':add-post')
     }
     return (
          <div className="w-full flex flex-col">
               <div className='p-10'>
                    <h1 className='mb-5'>My Jobs</h1>
                    <div className='bg-zinc-200 p-8 py-8 rounded-lg mb-10 flex items-center justify-between'>
                         <div className='flex items-baseline'>
                              <h1 className='font-semibold text-4xl'>8</h1>
                              <span className='font-normal text-2xl ml-4'>job posts</span>
                         </div>
                         <button onClick={handleClick} className='py-2 px-6 text-white font-semibold rounded-xl shadow-lg shadow-gray-300 hover:scale-110 bg-[#24ac8f] hover:bg-[#1a7460]'>New post</button>
                    </div>
                    <div className=''>
                         <JobPostTable />
                    </div>
               </div>
               <Outlet />        

          </div>     
     )
}
