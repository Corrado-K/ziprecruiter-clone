// import { HiArrowUp } from "react-icons/hi2";
import { ClientNavbar } from "../components/ClientNavbar";
import { Outlet } from "react-router-dom";

const ClientHomeLayout = () => {
     return ( 
          <> 
               <ClientNavbar />
               <Outlet />
               {/* <button className="fixed bottom-20 right-20 p-5 bg-[#277f6a] rounded-full text-white shadow-2xl drop-shadow-sm shadow-slate-500"
                    onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}
               >
                    <HiArrowUp />
               </button> */}
          </>
         
     );
}
 
export default ClientHomeLayout;