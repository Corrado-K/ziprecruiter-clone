import React, { useState, useRef } from "react";
import { HiOutlineBuildingOffice2, HiOutlineXMark } from "react-icons/hi2";
import ResumeImg from "../../assets/resume.svg";
import { useNavigate } from 'react-router-dom';

const UpdateJobPostModal = () => {
     const [showModal, setShowModal] = useState(true);

     const navigator = useNavigate()

     const handleCloseModal = () => {
          navigator(-1)
          setShowModal(false)
     }

     const handleSubmit = (e:any) => {
          e.preventDefault()
          
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
                                                            Job Post
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
                                             >
                                                  <div className="flex flex-col space-y-3 w-[90%]">
                                                       <input
                                                            type="text"
                                                            className="w-full py-3 px-5 bg-transparent border"
                                                            placeholder="Title"
                                                            name="title"
                                                            // onChange={formik.handleChange}
                                                            // onBlur={formik.handleBlur}
                                                            // value={formik.values.email}
                                                       />
                                                       <textarea className="w-full py-3 px-5 bg-transparent border" placeholder="Description"></textarea>
                                                       <input
                                                            type="text"
                                                            className="w-full py-3 px-5 bg-transparent border"
                                                            placeholder="Location"
                                                            name="location"
                                                            // onChange={formik.handleChange}
                                                            // onBlur={formik.handleBlur}
                                                            // value={formik.values.email}
                                                       />
                                                       <input
                                                            type="text"
                                                            className="w-full py-3 px-5 bg-transparent border"
                                                            placeholder="Experience"
                                                            name="experience"
                                                            // onChange={formik.handleChange}
                                                            // onBlur={formik.handleBlur}
                                                            // value={formik.values.email}
                                                       />
                                                       <br />
                                                       <br />
                                                       
                                                       <button
                                                            onClick={handleSubmit}
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
