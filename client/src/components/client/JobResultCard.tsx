import { HiOutlineBriefcase, HiOutlineBuildingOffice2} from 'react-icons/hi2';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';
const JobResultCard = ({id, r_id, title, description, location, experience}:{id:string, r_id:string, title:string, description:string, location:string, experience:string}) => {
     return (
          <>
          <Link to={`/jobs/${r_id}/${id}`}>
               <div className="border p-5 rounded-xl text-black mb-2 bg-white shadow-md">

                    <div className="pb-10">
                         <span className='flex items-center space-x-1 py-2 px-4 rounded-full border bg-[#f6f6f6] float-right text-[#1a7460] text-sm font-semibold'><MdVerified /> <span>Legit</span> </span>
                    </div>
                    {/* Job icon */}
                    <HiOutlineBuildingOffice2 color='#b2b2b28c' size={35} />

                    <h3 className="font-semibold mb-3">{title}</h3>

                    <p className="text-[13px]">Recruiter Name</p>
                    <p className="text-[13px]">{location}</p>

                    <span className='flex items-center text-xs space-x-1 p-1 bg-[#b2b2b28c] w-fit rounded-md my-5'>
                         <HiOutlineBriefcase /> 
                         <span>{experience}</span> 
                    </span>


                    <p className="text-xs">
                         {description}
                    </p>
               </div>
          </Link>
          </>
     )
}

export default JobResultCard