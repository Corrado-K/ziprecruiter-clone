import { HiOutlineBriefcase, HiOutlineBuildingOffice2} from 'react-icons/hi2';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
const JobResultCard = () => {
     return (
          <>
          <Link to={'/jobs/1/1'}>
               <div className="border p-5 rounded-xl text-black mb-2 bg-white shadow-md">

                    <div className="pb-10">
                         {/* <Link to={'/login'}>
                              <button className='flex py-2 px-6 rounded-full border bg-[#f6f6f6] hover:bg-[#b2b2b228] float-right text-[#1a7460] font-semibold'>Apply</button>
                         </Link> */}
                         <span className='flex items-center space-x-1 py-2 px-4 rounded-full border bg-[#f6f6f6] float-right text-[#1a7460] text-sm font-semibold'><MdVerified /> <span>Legit</span> </span>
                    </div>
                    {/* Job icon */}
                    <HiOutlineBuildingOffice2 color='#b2b2b28c' size={35} />

                    <h3 className="font-semibold mb-3">Job Name</h3>

                    <p className="text-[13px]">Recruiter Name</p>
                    <p className="text-[13px]">Job location</p>

                    <span className='flex items-center text-xs space-x-1 p-1 bg-[#b2b2b28c] w-fit rounded-md my-5'>
                         <HiOutlineBriefcase /> 
                         <span>Work type</span> 
                    </span>


                    <p className="text-xs">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                         Cupiditate ipsam similique temporibus dolore fuga repellat 
                         porro esse doloribus officia quaerat iste cumque, aperiam laboriosam,  
                         earum harum repudiandae? Itaque, minus vel!
                    </p>
               </div>
          </Link>
          </>
     )
}

export default JobResultCard