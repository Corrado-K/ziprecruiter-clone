import { Outlet } from "react-router-dom"
import JobDetailsCard from "../../components/JobDetailsCard"

const JobDetailsPage = () => {
     return (
          <div className="w-full flex flex-col items-center justify-center pt-[2%]">
               <JobDetailsCard />     
               <Outlet />        
          </div>
     )
}

export default JobDetailsPage