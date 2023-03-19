import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAccessToken } from '../utils/token.utils';
import axiosInstance from '../utils/axios.utils';


export const AuthGuard = () => {

     const location = useLocation()
     const accessToken = getAccessToken()
     const { isLoggedIn } = useContext(AuthContext)

     // get redirect data from local storage
     localStorage.setItem("redirect_query_params", location.search);
     localStorage.setItem("redirect_to", location.pathname);
     localStorage.setItem("loginMessage", "You need to log in to continue");

     if (!accessToken) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
     }
   
     return <>{ isLoggedIn ? <Outlet /> : <Navigate to="/login" replace /> }</>;
}
