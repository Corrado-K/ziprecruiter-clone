import React, { useState, useRef } from "react";
import { HiOutlineBuildingOffice2, HiOutlineXMark } from "react-icons/hi2";
import ResumeImg from "../assets/resume.svg";

const UploadDocumentsModal = () => {
     const [showModal, setShowModal] = useState(true);
     const [file, setFile] = useState<File>()
     const inputRef = useRef<HTMLInputElement | null>(null)

     const handleClick = (e:any) => {
          e.preventDefault()
          inputRef.current?.click();
     };
     const handleFileChange = (e:any) => {
          const fileObj = e.target.files && e.target.files[0];
          if (!fileObj) {
               return;
          }
          e.target.value = null // reset file input
          setFile(fileObj)
     };
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
                                                            Applying to
                                                       </small>
                                                       <h3 className="text-sm font-semibold">
                                                            Company Name
                                                       </h3>
                                                       <small>Location</small>
                                                  </div>
                                             </div>
                                             <button
                                                  className="bg-transparent border-0 text-black float-right"
                                                  onClick={() =>
                                                       setShowModal(false)
                                                  }
                                             >
                                                  <span className="text-black opacity-7 text-xl block">
                                                       <HiOutlineXMark />
                                                  </span>
                                             </button>
                                             {/* <h3 className="text-3xl font=semibold">
                                                  General Info
                                             </h3> */}
                                        </div>
                                        <div className="relative p-6 flex-auto">
                                             <h1 className="text-2xl font-semibold">Apply Now</h1>
                                             <p className="mt-3">
                                                  Upload a resume to apply to
                                                  this job.
                                             </p>
                                             <img className="mx-auto p-12 pb-4" src={ResumeImg} alt="" />
                                             <p className="text-center mb-10">{file?.name}</p>
                                             <form className="w-full flex flex-col items-center justify-center mt-5 mb-8">
                                                  <input
                                                       type="file"
                                                       className="hidden"
                                                       ref={inputRef}
                                                       onChange={handleFileChange}
                                                       accept=".docx,.txt,.pdf"
                                                       name=""
                                                       id=""
                                                  />{
                                                       file ?
                                                            <>
                                                                 <button
                                                                      onClick={handleSubmit}
                                                                      className="w-[50%] py-3 mb-2 bg-[#277f6a] text-white font-semibold rounded-full"
                                                                 >
                                                                      Submit
                                                                 </button>
                                                                 <p className="text-[#32a58b] hover:text-[#277f6a] hover:underline" onClick={handleClick}>Choose new file</p>
                                                            </>
                                                            :
                                                            <button
                                                                 onClick={handleClick}
                                                                 className="w-[50%] py-3 bg-[#277f6a] text-white font-semibold rounded-full"
                                                            >
                                                                 Apply
                                                            </button>
                                                  }
                                                  {/* <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" /> */}
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

export default UploadDocumentsModal;
