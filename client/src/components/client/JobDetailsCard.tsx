import { HiOutlineBuildingOffice2, HiOutlineBriefcase } from "react-icons/hi2"
import { MdVerified } from "react-icons/md"
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';


const JobDetailsCard = ({id, title, description, location, experience}:{id:string, title:string, description:string, location:string, experience:string}) => {

     const { isLoggedIn } = useContext(AuthContext)
     const navigator = useNavigate()
    
     const handleClick = (e:any) => {
          e.preventDefault()
          if (!isLoggedIn) {
               // if not
               return navigator('/login')  
          }

          navigator('upload')

     }
     return (
          <div className="w-[40%] bg-white shadow-lg rounded-xl p-10">
               <div className="pb-10">
                    <span className='flex items-center space-x-1 py-2 px-4 rounded-full border bg-[#f6f6f6] float-right text-[#1a7460] text-sm font-semibold'><MdVerified /> <span>Legit</span> </span>
               </div>
               {/* Job icon */}
               <HiOutlineBuildingOffice2 color='#b2b2b28c' size={35} />

               <h3 className="text-lg font-semibold mt-3 uppercase">{title}</h3>
               <p className="capitalize">{location}</p>

               <span className='flex items-center text-xs space-x-1 p-1 bg-[#b2b2b28c] w-fit rounded-md my-5'>
                    <HiOutlineBriefcase /> 
                    <span className="capitalize">{experience}</span> 
               </span>

               <div className={`overflow-y-auto h-auto max-h-72 `}>
                    <p className="text-sm shadow-inner capitalize shadow-gray-300 rounded-lg p-4">
                         {description}
                    </p>     
               </div>
               
               <div className="border-b mt-10"></div>


                    <div className="flex flex-col mx-[20%] my-5">
                         <button type="submit" onClick={handleClick} className="p-3 mt-5 bg-[#277f6a] rounded-full font-bold text-white">
                              Apply Now
                         </button>
                    </div>               

               <p className="text-center text-xs">By clicking the button above, I agree to the ZipRecruiter Terms of Use and acknowledge I have read the Privacy Policy, and agree to receive email job alerts.</p>
              
          </div>
     )
}

export default JobDetailsCard