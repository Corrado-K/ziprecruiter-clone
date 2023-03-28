import React from 'react'
import {BsFileEarmarkText} from 'react-icons/bs'
import { HiOutlineTrash, HiTrash } from 'react-icons/hi2';
import { useAppDispatch } from '../../redux/store';
import { deleteApplication } from '../../redux/applicationSlice';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyApplication = ({id, status, createdAt, title, experience}:{id: string, status: string, createdAt: string, title: string, experience: string}) => {
     const dateTimeString = createdAt;
     const date = new Date(dateTimeString)
     const year = date.getFullYear()
     const month = String(date.getMonth() + 1).padStart(2, '0')
     const day = String(date.getDate()).padStart(2, '0')
     const dateString = `${year}-${month}-${day}`

     const dispatch = useAppDispatch()
     const navigator = useNavigate()

     const deleteApplicationFn = async(id:string) => {
          try {
               await dispatch(deleteApplication(id))
          } catch (error) {
               const { response } = error as AxiosError<{ message: string }>;

          }
     }

     const handleDelete = (event: React.MouseEvent<HTMLButtonElement>,id:string) => {
          Swal.fire({
               title: `Are you sure?`,
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#1a7460",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!",
          }).then((result) => {
               if (result.isConfirmed) {
                    deleteApplicationFn(id).then(() => {
                         Swal.fire({
                              title: "Deleted!",
                              text: `Job post ${id} has been deleted.`,
                              icon: "success",
                              confirmButtonColor: "#000"
                         }).then(() => {
                              console.log("Hello");
                              // setTriggered(true)
                              navigator('/myapplications')
                         });
                         
                    })
                    
               }
          });
     };
     return (
          <div className='px-8 py-5 bg-white shadow-lg rounded-lg flex justify-between'>
               {/* icon and job title */}
               <div className='flex items-center space-x-5'>
                    <span className='p-4 bg-[#1a7460] rounded-full'>
                         <BsFileEarmarkText color='#fff' size={30} />
                    </span>
                    <div>
                         <h2 className='text-lg font-semibold uppercase'>{title}</h2>
                         <p className='text-sm uppercase'>{experience}</p>
                    </div>
               </div>
               {/* date of application & status */}
               <div className='flex flex-col justify-center text-right space-y-1'>
                    <p className='text-sm'>{dateString}</p>
                    <p className={`font-medium ${status === 'PENDING' && 'text-blue-700'} ${status === 'HIRED' && 'text-green-500'} ${status === 'REJECTED' && 'text-red-500'}`}>{status}</p>
                    <button onClick={(e) => handleDelete(e, id)} className='flex justify-end'> <HiOutlineTrash className='text-red-500' /> </button>
               </div>
          </div>
     )
}

export default MyApplication