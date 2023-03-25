import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from '../../redux/store';
import { deleteJobPost } from "../../redux/jobPostSlice";
import { AxiosError } from "axios";
import { useState, useEffect } from 'react';
import { fetchMyJobPosts } from '../../redux/jobPostSlice';
import { IJobPost } from "../../interface";



const JobPostTable = () => {
     const navigator = useNavigate();
     const dispatch = useAppDispatch()
     const [myjobs, setMyjobs] = useState<IJobPost[]>([]);
     const [triggered, setTriggered] = useState(false)

     const getMyJobPosts = async () => {
          try {
               const data = await dispatch(fetchMyJobPosts())
               // @ts-ignore
               setMyjobs(data?.payload.payload)
          } catch (error) {
               console.error(error);
          }
     }

     useEffect(() => {
          getMyJobPosts()
          setTriggered(false)
     }, [triggered]);

     console.log(myjobs);
     

     const deletePost = async(id:string) =>  {
          try {
               await dispatch(deleteJobPost(id)) //this accepts the index of a post as parameter
          } catch (error) {
               const { response } = error as AxiosError<{ message: string }>;
          }
     }

     const handleEditClick = (event: React.MouseEvent<HTMLSpanElement>,id:string) => {
          navigator(id); //this accepts the index of a post as parameter
     };

     const handleDeleteClick = (event: React.MouseEvent<HTMLSpanElement>,id:string) => {
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
                    deletePost(id).then(() => {
                         Swal.fire({
                              title: "Deleted!",
                              text: `Job post ${id} has been deleted.`,
                              icon: "success",
                              confirmButtonColor: "#000"
                         }).then(() => {
                              console.log("Hello");
                              setTriggered(true)
                              // navigator('/admin/my-jobs')
                         });
                         
                    })
                    
               }
          });
     };
     return (
          <div className="bg-gray-200 p-4 rounded-lg">
               <div className="flex items-center">
                    <h4 className="font-semibold">TODAY'S APPOINTMENTS</h4>
               </div>

               <div className="">
                    <table className="border-collapse w-full mt-4">
                         <thead>
                              <tr className="text-white bg-[#1a7460]">
                                   <th className="p-3 border border-gray-300 text-left">
                                        Title
                                   </th>
                                   <th className="p-3 border border-gray-300 text-left">
                                        Description
                                   </th>
                                   <th className="p-3 border border-gray-300 text-left">
                                        Location
                                   </th>
                                   <th className="p-3 border border-gray-300 text-left">
                                        Experience
                                   </th>
                                   <th className="p-3 border border-gray-300 text-left">
                                        ...
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   myjobs.map((jobpost) => (
                                        <tr key={jobpost?.id} className="hover:bg-[#f0fffd] odd:bg-[#eeeeee] even:bg-[#e3edea]">
                                             <td className="p-3 border border-gray-300 text-sm">
                                             {jobpost?.title} 
                                             </td>
                                             <td className="p-3 border border-gray-300 text-sm">
                                             {jobpost?.description} 
                                             </td>
                                             <td className="p-3 border border-gray-300 text-sm">
                                             {jobpost?.location} 
                                             </td>
                                             <td className="p-3 border border-gray-300 text-sm">
                                             {jobpost?.experience} 
                                             </td>
                                             <td className="p-3 border border-gray-300 text-sm text-right">
                                                  <span
                                                       className="mr-3 text-sky-400 underline cursor-pointer"
                                                       onClick={(e) => handleEditClick(e, jobpost?.id)}
                                                  >
                                                       Edit
                                                  </span>
                                                  <span
                                                       className="mr-3 text-red-400 underline cursor-pointer"
                                                       onClick={(e) => handleDeleteClick(e, jobpost?.id)}
                                                  >
                                                       Delete
                                                  </span>
                                             </td>
                                        </tr>
                                   ))
                              }

                              
                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default JobPostTable;
