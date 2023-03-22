import axios, { AxiosError } from "axios";
import jwtDecode from "jwt-decode";
import { SERVER_URL } from "../utils/constants";
import { clearUserData, getAccessToken, getRefreshToken, setUserData } from "../utils/token.utils";
import { LoginResponse } from "../interface/index";

const axiosInstance = axios.create({
     baseURL: SERVER_URL,
     headers: {
          "Content-Type": "application/json",
     },
});

// refresh expired access tokens before sending requests
axiosInstance.interceptors.request.use(async (config) => {
     if (config.headers?.Authorization) {
          const accessToken = String(config.headers.Authorization).split(
               " "
          )[1];
          const exp = jwtDecode<{ exp: number }>(accessToken).exp;
          if (exp < new Date().getTime() / 1000) {
               console.log("refreshing token before request...");
               const refreshToken = getRefreshToken();
               const { data } = await axios.post<LoginResponse>(
                    `${SERVER_URL}/auth/refresh-token`,
                    { token: refreshToken }
               );
               config.headers.Authorization = `Bearer ${data.accessToken}`;
               setUserData(data.accessToken, data.refreshToken);
          }
     }
     return config;
});

// automatically log out when refresh token has expired
axiosInstance.interceptors.response.use(
     (response) => {
          return Promise.resolve(response);
     },
     async (err) => {
          let error = err;
          console.log(error);
          const { response } = error as AxiosError<{ message?: string }>;
          if (
               response?.data.message === "jwt expired" ||
               response?.data.message === "invalid refresh token"
          ) {
               error = new Error("You have been logged out");
               localStorage.setItem(
                    'loginMessage',
                    "You need to log in to continue"
               );
               clearUserData();
               window.location.href = "/login";
          }
          return Promise.reject(error);
     }
);

export default axiosInstance;
