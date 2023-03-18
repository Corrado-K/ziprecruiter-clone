import { useRoutes } from "react-router-dom";
import ClientHomeLayout from "../layout/ClientHomeLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";


const Router = () => { 
     return useRoutes([
          {
               path: '/',
               element: <ClientHomeLayout />,
               children: [
                    { path: '/login', element: <LoginPage /> },
                    { path: '/register', element: <RegisterPage /> }
               ]
          }
     ])
}
export default Router;