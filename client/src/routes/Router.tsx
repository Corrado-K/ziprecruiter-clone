import { useRoutes } from "react-router-dom";
import ClientHomeLayout from "../layout/ClientHomeLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { AuthGuard } from "./AuthGuard";
import { SearchPage} from '../pages/client/SearchPage.jsx'
import { SearchResults } from "../pages/client/SearchResults";
import JobDetailsPage from '../pages/client/JobDetailsPage';

const Router = () => { 
     return useRoutes([
          {
               path: '/',
               element: <ClientHomeLayout />,
               children: [
                    { element: <SearchPage />, index: true},
                    { path: 'search-results/', element: <SearchResults />},
                    { path: 'jobs/:cid/:jid', element: <JobDetailsPage />},
                    { path: 'jobs/', element: ''},
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