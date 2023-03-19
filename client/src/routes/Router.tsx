import { useRoutes } from "react-router-dom";
import ClientHomeLayout from "../layout/ClientHomeLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { AuthGuard } from "./AuthGuard";


const Router = () => { 
     return useRoutes([
          {
               path: '/',
               element: <ClientHomeLayout />,
               children: [
                    { element: '', index: true},
                    { path: 'jobs/:id', element: '', index: true},
                    { path: 'login', element: <LoginPage /> },
                    { path: 'register', element: <RegisterPage /> }
               ]
          }, 
          {
               path: '/',
               element: <AuthGuard />,
               children: [
                    {
                         element: <ClientHomeLayout />,
                         path: '/',
                         children: [
                              {
                                   path: 'job/',
                                   element: '',
                                   children: [
                                        {}
                                   ]
                              }
                         ]
                    }
               ]
          }
     ])
}
export default Router;