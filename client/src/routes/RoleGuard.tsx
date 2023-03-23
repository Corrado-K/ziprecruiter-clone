import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAccessToken } from "../utils/token.utils";
import axiosInstance from "../utils/axios.utils";

const HostGuard = () => {
     const { isLoggedIn, role } = useContext(AuthContext);
     if (!isLoggedIn || role !== "RECRUITER") {
          return <Navigate to="/login" replace />;
     } else {
          const accessToken = getAccessToken();
          if (accessToken) {
               axiosInstance.defaults.headers.common[
                    "Authorization"
               ] = `Bearer ${accessToken}`;
          }
          
     }
     return <Outlet />;
};

export default HostGuard;
