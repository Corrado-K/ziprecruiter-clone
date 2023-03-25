// import { HiArrowUp } from "react-icons/hi2";
import Sidebar from "../components/admin/Sidebar";
import { ClientNavbar } from "../components/client/ClientNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
     return ( 
          <> 
               <div className="w-screen h-screen flex">
                    {/* Sidebar */}
                    <div className="w-[25%] sticky">
                         <Sidebar />
                    </div>
                    <div className="w-full overflow-y-auto">
                         <Outlet /> 
                    </div>
               </div>

          </>
         
     );
}
 
export default AdminLayout;