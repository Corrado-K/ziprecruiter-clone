import React from 'react'
import DashboardCards from '../../components/admin/DashboardCards'

export const Dashboard = () => {
     return (
          <div className="w-full flex flex-col">
               <div className='p-10'>
                    <h1 className='mb-10'>Dashboard</h1>
                    <div className='grid grid-cols-4 gap-6'>
                         <DashboardCards />
                         <DashboardCards />
                         <DashboardCards />
                         <DashboardCards />
                    </div>
               </div>
          </div>
     )
}
