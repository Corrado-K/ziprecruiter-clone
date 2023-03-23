
import { HiArrowRight } from "react-icons/hi";
import { HiBriefcase, HiQuestionMarkCircle, HiSquares2X2, HiUser, HiUsers } from "react-icons/hi2";


const DashboardCards = () => {
     return (
          <div className="flex justify-between items-center space-x-10  bg-[#eeeeee] shadow-lg p-6 w-auto rounded-lg">
               {/* Icon */}
               <div className="p-3 rounded-full bg-[#46bea4]">
                    <HiUsers size={50} color="#1a7460"/>
               </div>
               <div className="text-right block">
                    <p className="text-lg">Value Metric</p>
                    <p className="text-3xl font-semibold">56</p>
                    <HiArrowRight className="float-right" />
               </div>
          </div>
     )
}

export default DashboardCards