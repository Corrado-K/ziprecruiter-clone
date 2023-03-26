import React from 'react'
import Container from '../../components/client/Container'
import MyApplication from '../../components/client/MyApplication'

export const MyApplicationsPage = () => {
     return (
          <div className="w-full flex flex-col justify-center">
               <Container>
                    <h2 className='text-xl font-semibold mt-5'>My Applications</h2>
                    <div className='mt-10 space-y-4'>
                         <MyApplication />
                         <MyApplication />
                    </div>
               </Container>
          </div>
     )
}
