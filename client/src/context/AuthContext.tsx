import { Children, FC, ReactNode, createContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { IDecodeJWT, LoginResponse, User } from '../interface/index';
import { clearUserData, getUserData, setUserData } from "../utils/token.utils";
import axios from "axios";
import jwtDecode from 'jwt-decode'
import axiosInstance from "../utils/axios.utils";
import { SERVER_URL } from "../utils/constants";

interface IAuthContext extends Omit<User, "accessToken"> {
     isLoggedIn: boolean;
     setIsLoggedIn: (status: boolean) => void;
     login: ( email: string, password: string ) => Promise<void>;
     signup: ( firstName: string, lastName: string, email: string, password: string ) => Promise<void>;
     logout: () => Promise<void>;
}

const initialAuthContext: IAuthContext = {
     id: getUserData()?.id ?? null,
     email: getUserData()?.email ?? null,
     role: getUserData()?.role ?? null,
     isLoggedIn: Boolean(getUserData()?.accessToken) ?? false,
     setIsLoggedIn: () => {},
     login: () => Promise.resolve(),
     signup: () => Promise.resolve(),
     logout: () => Promise.resolve(),
}

export const AuthContext = createContext<IAuthContext>(initialAuthContext)

interface Prop {
     children? : ReactNode
}

export const AuthContextProvider: FC<Prop> = ({children}) => {

     const [id, setId] = useState(initialAuthContext.id);
     const [email, setEmail] = useState(initialAuthContext.email);
     const [role, setRole] = useState(initialAuthContext.role);
     const [isLoggedIn, setIsLoggedIn] = useState(initialAuthContext.isLoggedIn);

     const navigator = useNavigate()

     // login function using axios to make api call
     const signup = async (firstName : string, lastName: string, email: string, password: string) => {
          // Set the values as null before assigning to prevent errors
          setId(null) 
          setEmail(null)
          setRole(null)
          setIsLoggedIn(false)
          await axios.post(`${URL}/auth/signup`, { firstName, lastName, email, password })
          navigator('/')
     }

     const login = async (email: string, password: string) => {
          // Set the values as null before assigning to prevent errors
          setId(null) 
          setEmail(null)
          setRole(null)
          setIsLoggedIn(false)

          const { data } = await axios.post<LoginResponse>(`${SERVER_URL}/auth/login`, { email, password })
          const jwtData = jwtDecode(data.accessToken) as IDecodeJWT

          setId(jwtData.id) 
          setEmail(jwtData.email)
          setRole(jwtData.role)
          setIsLoggedIn(true)

          // Store the access and refresh token
          setUserData(data.accessToken, data.refreshToken)

          // after login, navigate to either page you previous were at, or home
          let redirectPath = "/";
          if (jwtData.role === "candidate") {
               const redirect_to = localStorage.getItem('redirect_to');
               const params = localStorage.getItem('redirect_query_param');
               if (redirect_to != null) {
                    redirectPath = redirect_to;
               }
               if (params != null) {
                    redirectPath += params;
               }
          } else {
               redirectPath = "/";
          }
          navigator(redirectPath);
      
      
     }
     const logout = async () => {
          delete axiosInstance.defaults.headers.common["Authorization"];

          setIsLoggedIn(false);
          setEmail(null);
          setRole(null);
          setId(null);

          clearUserData(); 
          navigator("/");
     }

     return (
          <AuthContext.Provider
               value={{
                    id, role, email, isLoggedIn, setIsLoggedIn, login, logout, signup
               }}
          >
               {children}

          </AuthContext.Provider>
     )
} 