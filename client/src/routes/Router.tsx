import { useRoutes } from "react-router-dom";
import ClientHomeLayout from "../layout/ClientHomeLayout";
import { LoginPage } from "../pages/auth/LoginPage";


const Router = () => { 
     return useRoutes([
          {
               path: '/',
               element: <ClientHomeLayout />,
               children: [
                    { path: '/login', element: <LoginPage /> }
               ]
          }
     ])
}
export default Router;