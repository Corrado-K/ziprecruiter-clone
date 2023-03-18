import { ClientNavbar } from "../components/ClientNavbar";
import { Outlet } from "react-router-dom";

const ClientHomeLayout = () => {
     return ( 
          <> 
               <ClientNavbar />
               <Outlet />
          </>
         
     );
}
 
export default ClientHomeLayout;