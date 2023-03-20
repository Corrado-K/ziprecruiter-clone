// import { HiArrowUp } from "react-icons/hi2";
import { ClientNavbar } from "../components/client/ClientNavbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
     return ( 
          <> 
               <ClientNavbar />
               <Outlet />
          </>
         
     );
}
 
export default ClientLayout;