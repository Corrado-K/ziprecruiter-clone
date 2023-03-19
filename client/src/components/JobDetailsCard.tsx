import { HiOutlineBuildingOffice2, HiOutlineBriefcase } from "react-icons/hi2"

const JobDetailsCard = () => {
     return (
          <div className="w-[40%] bg-white shadow-lg rounded-xl p-10">
               <div className="pb-10">
               </div>
               {/* Job icon */}
               <HiOutlineBuildingOffice2 color='#b2b2b28c' size={35} />

               <h3 className="text-lg font-semibold mb-3">Job Name</h3>

               <p>Recruiter Name</p>
               <p>Job location</p>

               <span className='flex items-center text-xs space-x-1 p-1 bg-[#b2b2b28c] w-fit rounded-md my-5'>
                    <HiOutlineBriefcase /> 
                    <span>Work type</span> 
               </span>

               <div className="overflow-y-auto h-20 ">
                    <p className="text-sm">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                         Cupiditate ipsam similique temporibus dolore fuga repellat 
                         porro esse doloribus officia quaerat iste cumque, aperiam laboriosam,  
                         earum harum repudiandae? Itaque, minus vel!
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                         Cupiditate ipsam similique temporibus dolore fuga repellat 
                         porro esse doloribus officia quaerat iste cumque, aperiam laboriosam,  
                         earum harum repudiandae? Itaque, minus vel!
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                         Cupiditate ipsam similique temporibus dolore fuga repellat 
                         porro esse doloribus officia quaerat iste cumque, aperiam laboriosam,  
                         earum harum repudiandae? Itaque, minus vel!
                    </p>     
               </div>
              
          </div>
     )
}

export default JobDetailsCard