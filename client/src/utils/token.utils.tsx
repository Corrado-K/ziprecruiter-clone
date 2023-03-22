import { IDecodeJWT, User } from "../interface"
import jwtDecode from 'jwt-decode';


// just like backend util but retrieval instead
export const getAccessToken = () => {

     let accessToken = ""
     const userData = localStorage.getItem('userData')

     if (userData !== null) {
          const userDataJsonify: User = JSON.parse(userData)
          accessToken = userDataJsonify.accessToken? userDataJsonify.accessToken : ''
     }

     return accessToken
}
export const getRefreshToken = () => {

     let refreshToken = localStorage.getItem('refreshToken')

     if (refreshToken === null) {
          refreshToken = "";
     }
     return refreshToken;
}

export const setUserData = (accessToken: string, refreshToken: string) => {

     const jwtData = jwtDecode(accessToken) as IDecodeJWT
     const jsonUserData: User = {
          id: jwtData.id,
          email: jwtData.email,
          role: jwtData.role,
          accessToken,
     }

     localStorage.setItem('userData', JSON.stringify(jsonUserData));
     localStorage.setItem('refreshToken', refreshToken);
}
export const getUserData = () => {

     let jsonUserData: User | null = null;
     const userData = localStorage.getItem('userData');

     if (userData !== null) {
          jsonUserData = JSON.parse(userData);
     }
     return jsonUserData;
}

export const clearUserData = () => {
     localStorage.removeItem('userData');
     localStorage.removeItem('refreshToken');
}
