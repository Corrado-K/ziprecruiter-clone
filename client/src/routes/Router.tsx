import { useRoutes } from "react-router-dom";
import ClientLayout from "../layout/ClientLayout";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { AuthGuard } from "./AuthGuard";
import { SearchPage} from '../pages/client/SearchPage.jsx'
import { SearchResults } from "../pages/client/SearchResults";
import JobDetailsPage from '../pages/client/JobDetailsPage';
import UploadDocumentsModal from '../components/client/UploadDocumentsModal';
import AdminLayout from "../layout/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import { ApplicantsPage } from "../pages/admin/ApplicantsPage";
import { MyJobsPage } from "../pages/admin/MyJobsPage";
import { AdminProfilePage } from "../pages/admin/AdminProfile";
import { HelpPage } from "../pages/admin/HelpPage";
import JobPostModal from "../components/admin/JobPostModal";
import UpdateJobPostModal from "../components/admin/UpdateJobPostModal";
import RoleGuard from "./RoleGuard";
import { MyApplicationsPage } from "../pages/client/MyApplicationsPage";

const Router = () => { 
     return useRoutes([
          {
               path: '/',
               element: <ClientLayout />,
               children: [
                    { element: <SearchPage />, index: true},
                    { path: 'search-results', element: <SearchResults />},
                    { path: 'jobs/:cid/:jid', element: <JobDetailsPage />},
                    { path: 'login', element: <LoginPage /> },
                    { path: 'register', element: <RegisterPage /> }
               ]
          }, 
          {
               path: '/',
               element: <AuthGuard />,
               children: [
                    {
                         element: <ClientLayout />,
                         path: '/',
                         children: [
                              { element: null, index:true },
                              { path: 'myapplications/', element: <MyApplicationsPage />},
                              { path: 'jobs/:cid/:jid/', element: <JobDetailsPage />,
                                   children: [
                                        { path: "upload", element: <UploadDocumentsModal /> },
                                   ]
                              },
                         ]
                    }
               ]
          },
          {
               path: '/admin',
               element: <RoleGuard />,
               children:[ 
                    {
                         element: <AdminLayout />,
                         children: [
                              { element: <Dashboard />, index: true},
                              { path: 'applicants', element: <ApplicantsPage />},
                              { path: 'my-jobs/', element: <MyJobsPage />,
                                   children: [
                                        { path: "add-post", element: <JobPostModal /> },
                                        { path: ":id", element: <UpdateJobPostModal /> },
                                   ]
                              },
                              { path: 'profile', element: <AdminProfilePage />},
                              { path: 'help', element: <HelpPage />},
                         ]
                     }
               ]
          }
     ])
}
export default Router;