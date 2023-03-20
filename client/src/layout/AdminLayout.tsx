// import { HiArrowUp } from "react-icons/hi2";
import Sidebar from "../components/admin/Sidebar";
import { ClientNavbar } from "../components/client/ClientNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
     return ( 
          <> 
               <div className="w-screen h-screen flex">
                    {/* Sidebar */}
                    <Sidebar />
                    <Outlet />
               </div>

          </>
         
     );
}
 
export default AdminLayout;