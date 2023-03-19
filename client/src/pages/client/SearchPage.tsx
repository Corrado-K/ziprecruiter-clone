import { Link } from "react-router-dom"
import JobSearchInput from "../../components/JobSearchInput"

export const SearchPage = () => {
     return (
          <div className="w-full flex flex-col justify-center items-center">
               <div className="w-full flex flex-col justify-center py-[10%] items-center">
                    <h1 className="mb-10">Find Jobs  in Accra, GH</h1>

                    {/* Search */}
                    <JobSearchInput />
                    
                    <h2 className="text-lg mt-5"> <Link to={''}>Employers: Post a Job</Link> <span className="text-sm"> - Try ZipRecruiter</span> </h2>
     
               </div>
               
          </div>
     )
}
