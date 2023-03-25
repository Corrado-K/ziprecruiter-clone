import React, { useState, useRef } from "react";
import { HiOutlineBuildingOffice2, HiOutlineXMark } from "react-icons/hi2";
import ResumeImg from "../../assets/resume.svg";
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { postSchema } from "../../schema";
import { AxiosError } from "axios";
import { fetchJobPostById, updateJobPost } from "../../redux/jobPostSlice";
import axiosInstance from "../../utils/axios.utils";
import { useAppDispatch } from "../../redux/store";
import { useEffect } from 'react';

interface postValues {
     title: string,
     description: string,
     location: string,
     experience: string
}

const UpdateJobPostModal = () => {
     const [showModal, setShowModal] = useState(true);
     const [jobDetails, setJobDetails]= useState<postValues>()
     const navigator = useNavigate()
     const dispatch = useAppDispatch()
     

     const {id} = useParams()

     const handleCloseModal = () => {
          navigator(-1)
          setShowModal(false)
     }

     useEffect(() => {
          const fetchJobPost = async (jid:string|undefined) => {
               const data = await dispatch(fetchJobPostById(id))
               // @ts-ignore
               setJobDetails({
                    // @ts-ignore
                    title: data?.payload?.payload.title, description: data?.payload?.payload.description, location:data?.payload?.payload.location, experience: data?.payload?.payload.experience
               })
          }
          fetchJobPost(id).catch(console.error);
     }, [id]);
     

     


     const formik = useFormik({
          initialValues: {
               title: jobDetails?.title,
               description: jobDetails?.description,
               location: jobDetails?.location,
               experience: jobDetails?.experience,
          } ,
          onSubmit:  async (values) => {
               try {
                    // @ts-ignore 
                    // await dispatch(updateJobPost({id:id, title: values.title, description: values.description, location: values.location, experience: values.experience}))
                    // Add sweet alert for success
                    console.log(values);
                    
                    navigator(-1)

               } catch (error) {
                    const { response } = error as AxiosError<{ message: string }>;
               }
          },
          validationSchema: postSchema, 
     })



     const handleSubmit = async (e: any) => {
          e.preventDefault()

          try {
               // @ts-ignore 
               await dispatch(updateJobPost({id:id, title: jobDetails.title, description: jobDetails.description, location: jobDetails.location, experience: jobDetails.experience}))
               // Add sweet alert for success
               console.log(jobDetails);
               
               navigator(-1)

          } catch (error) {
               const { response } = error as AxiosError<{ message: string }>;
          }
     }
     
     return (
          <>
               {showModal ? (
                    <>
                         <div className="flex justify-center overflow-x-hidden bg-[#14141593] overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                              <div className="relative w-[30%] my-6 mx-auto max-w-3xl">
                                   <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full mt-20 bg-white outline-none focus:outline-none">
                                        <div className="flex items-center justify-between px-5 p-4 border-b border-solid border-gray-300 bg-gray-100 rounded-t-3xl">
                                             <div className="flex items-center justify-center">
                                                  {/* Job icon */}
                                                  <HiOutlineBuildingOffice2
                                                       color="#7e7e80"
                                                       size={50}
                                                  />
                                                  <div className="ml-5">
                                                       <small>
                                                            Update
                                                       </small>
                                                       <h3 className="text-sm font-semibold">
                                                            Job Post {id}
                                                       </h3>
                                                  </div>
                                             </div>
                                             <button
                                                  className="bg-transparent border-0 text-black float-right"
                                                  onClick={handleCloseModal}
                                             >
                                                  <span className="text-black opacity-7 text-xl block">
                                                       <HiOutlineXMark />
                                                  </span>
                                             </button>
                                             
                                        </div>
                                        <div className="relative p-6 flex-auto">
                                             
                                             <form
                                                  className="w-full flex flex-col items-center pb-5"
                                                  // onSubmit={formik.handleSubmit}
                                                  onSubmit={handleSubmit}
                                             >
                                                  <div className="flex flex-col space-y-3 w-[90%]">
                                                       <input
                                                            type="text"
                                                            className="w-full py-3 px-5 bg-transparent border"
                                                            placeholder="Title"
                                                            name="title"
                                                            //@ts-ignore
                                                            onChange={(e) => setJobDetails({...jobDetails, title: e?.target?.value})}
                                                            // onBlur={formik.handleBlur}
                                                            defaultValue={jobDetails?.title}
                                                            // value={}
                                                       />
                                                       <textarea className="w-full py-3 px-5 bg-transparent border" placeholder="Description"
                                                            name="description"
                                                            //@ts-ignore
                                                            onChange={(e) => setJobDetails({...jobDetails, description: e?.target?.value})}
                                                            // onBlur={formik.handleBlur}
                                                            defaultValue={jobDetails?.description}
                                                            // value={formik.values.description}
                                                       ></textarea>
                                                       <input
                                                            type="text"
                                                            className="w-full py-3 px-5 bg-transparent border"
                                                            placeholder="Location"
                                                            name="location"
                                                            //@ts-ignore
                                                            onChange={(e) => setJobDetails({...jobDetails, location: e?.target?.value})}
                                                            // onBlur={formik.handleBlur}
                                                            defaultValue={jobDetails?.location}
                                                            // value={formik.values.location}
                                                       />
                                                       <input
                                                            type="text"
                                                            className="w-full py-3 px-5 bg-transparent border"
                                                            placeholder="Experience"
                                                            name="experience"
                                                            //@ts-ignore
                                                            onChange={(e) => setJobDetails({...jobDetails, experience: e?.target?.value})}
                                                            // onBlur={formik.handleBlur}
                                                            defaultValue={jobDetails?.experience}
                                                            // value={formik.values.experience}

                                                       />
                                                       <br />
                                                       <br />
                                                       
                                                       <button
                                                            type="submit"
                                                            className="w-[50%] mx-auto py-3 mt-5 mb-5 bg-[#277f6a] text-white font-semibold rounded-full"
                                                       >
                                                            Submit
                                                       </button>
                                                  </div>
                                             </form>
                                        </div>
                                        
                                   </div>
                              </div>
                         </div>
                    </>
               ) : null}
          </>
     );
};

export default UpdateJobPostModal;
