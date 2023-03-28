import React, { useEffect, useState } from 'react'
import Container from '../../components/client/Container'
import MyApplication from '../../components/client/MyApplication'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { IApplicationDisplay } from '../../interface/index';
import { fetchMyApplications, selectapplications } from '../../redux/applicationSlice';
import Loader from '../../assets/Loader';

export const MyApplicationsPage = () => {
     const [loading, setloading] = useState(true);
     const navigator = useNavigate();
     const dispatch = useAppDispatch()
     const [myApplications, setMyApplications] = useState<IApplicationDisplay[]>([]);

     useEffect(() => {
          const getMyJobPosts = async () => {
               try {
                    const data = await dispatch(fetchMyApplications())                    
                    // @ts-ignore
                    setMyApplications(data?.payload.payload)
               } catch (error) {
                    console.error(error);
               }
          }
          
          getMyJobPosts()
               .then(() => {
                    setloading(false)
               })
     }, []);

     console.log(myApplications);
     
     

     return (
          <div className="w-full flex flex-col justify-center">
               <Container>
                    <h2 className='text-xl font-semibold mt-5'>My Applications</h2>
                    {
                         loading === true && 
                              <div className="flex items-center h-[60vh]">
                                   <Loader /> 
                              </div>
                         //  <div className='mt-10 p-10 bg-white shadow-xl rounded-lg'>
                         //      <h1 className='font-semibold text-green-600'>No Applications Here</h1>
                         //  </div>
                    }
                    <div className='mt-10 space-y-4 ease-in-out duration-1000'>
                         {
                              myApplications?.map((item, index) => (
                                   <MyApplication key={index} id={item?.id} title={item?.job_post?.title} experience={item?.job_post?.experience} status={item?.status} createdAt={item?.createdAt} />
                              ))
                         }
                         
                    </div>
               </Container>
          </div>
     )
}
