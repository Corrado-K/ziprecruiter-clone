
import { HiBriefcase, HiQuestionMarkCircle, HiSquares2X2, HiUser, HiUsers } from "react-icons/hi2";


const DashboardCards = () => {
     return (
          <div className="flex justify-between space-x-10 items-start bg-[#c5c5c5] p-5 px-10 w-auto rounded-lg">
               {/* Icon */}
               <HiUsers size={50} color="#09c"/>
               <div className="text-right">
                    <p className="text-lg">Value</p>
                    <span>56</span>
               </div>
          </div>
     )
}

export default DashboardCards