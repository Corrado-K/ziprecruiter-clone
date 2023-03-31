import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchRecruiterApplications, updateApplicationStatus, getResume } from '../../redux/applicationSlice';

const JobApplicantsTable = () => {

     const dispatch = useAppDispatch()
     const [applicationPayload, setApplicationPayload] = useState([])
     const [triggered, setTriggered] = useState(false)

     const getReceivedApplications = async () => {
          try {
               const data = await dispatch(fetchRecruiterApplications())
               // @ts-ignore
               setApplicationPayload(data?.payload.payload)
          } catch (error) {
               console.error(error);
          }
     }

     const handleFileView = async (id:string) => {
          try {
               const response = await dispatch(getResume(id));

               window.open('localhost:5000\\'+response?.payload?.payload, 'resume' ,'width=500,height=500')
               
          } catch (error) {
               console.error(error);
          }
     }

     useEffect(() => {
          getReceivedApplications()
          // @ts-ignore
          setTriggered(false)
     }, [triggered]);

     const handleEdit = async (e:any, id:string) => {
          e.preventDefault()
          // console.log(e.target.value);
          try {
               await dispatch(updateApplicationStatus({id: id, status: e.target.value}))
               setTriggered(true)
          } catch (error) {
               console.error(error);
          }
     }
     

     return (
          <div className='bg-gray-200 p-4 rounded-lg'>
               <div className="flex items-center">
                    <h4 className='font-semibold'>TODAY'S APPOINTMENTS</h4>
               </div>

               <div>
                    <table className="border-collapse w-full mt-4">
                         <thead>
                              <tr className='text-white bg-[#1a7460]'>
                                   <th className='p-3 border border-gray-300 text-left'>Name</th>
                                   <th className='p-3 border border-gray-300 text-left'>Email</th>
                                   <th className='p-3 border border-gray-300 text-left'>CV</th>
                                   <th className='p-3 border border-gray-300 text-left'>Status</th>
                                   <th className='p-3 border border-gray-300 text-left'></th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   // @ts-ignore
                                   applicationPayload?.map((item:any, index) => (
                                        <tr key={index} className='hover:bg-[#f0fffd] odd:bg-[#eeeeee] even:bg-[#e3edea]'>
                                             <td className='p-3 border border-gray-300 text-sm font-medium'>{item?.candidate?.fname + ' ' + item?.candidate?.lname}</td>
                                             <td className='p-3 border border-gray-300 text-sm font-medium'>{item?.candidate?.email}</td>
                                             <td className='p-3 border border-gray-300 text-sm font-medium hover:underline hover:text-sky-500 hover: cursor-pointer' onClick={() => handleFileView(item?.id)}>{item?.resume}</td>
                                             <td className='p-3 border border-gray-300 text-sm font-medium'>{item?.status}</td>
                                             <td className='p-3 border border-gray-300 text-sm text-right'>
                                                  <form>
                                                       <select className='w-32 bg-white p-2 border-2 font-medium border-[#1a7460] rounded-lg text-[#1a7460]' onChange={(e) => handleEdit(e, item?.id)} name="status">
                                                            <option className='text-sky-500' value={'PENDING'}>PENDING</option>
                                                            <option className='text-green-500' value={'HIRED'}>HIRE</option>
                                                            <option className='text-red-500' value={'REJECTED'}>REJECT</option>
                                                       </select>
                                                  </form>
                                                  
                                             </td>
                                        </tr>
                                   ))
                              }

                         </tbody>
                    </table>
               </div>

          </div>
     )
}

export default JobApplicantsTable