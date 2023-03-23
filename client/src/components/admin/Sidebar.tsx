// React hooks and more
import { useEffect, useState, useContext } from 'react';

// Assets
import { HiBriefcase, HiQuestionMarkCircle, HiSquares2X2, HiUser, HiUsers } from "react-icons/hi2";


// Components
import { Link } from 'react-router-dom';
import ZipRecruiterLogo from '../../assets/ZipRecruiterLogo';
import { HiOutlineLogout } from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {

     const { logout } = useContext(AuthContext)
     const handleLogout = (e:any) => {
          logout()
     }

     const menuItems = [
          {id: 1, page: 'Dashboard', icon: HiSquares2X2, path: '/admin' },
          {id: 2, page: 'Applicants', icon: HiUsers, path: '/admin/applicants' },
          {id: 3, page: 'Jobs', icon: HiBriefcase, path: '/admin/my-jobs' },
          {id: 4, page: 'Profile', icon: HiUser, path: '/admin/profile' },
          {id: 5, page: 'Help', icon: HiQuestionMarkCircle, path: '/admin/help' },
     ]

     return ( 
          <div className="h-full flex flex-col justify-between w-[20%] bg-[#1a7460] rounded-r-[10px] sticky">
               <div className="flex flex-col">
                    <div className='w-full flex justify-center mt-10'>
                         <Link to={'/'}>
                              <ZipRecruiterLogo width={200} height={50} color={'#fff'} />
                         </Link>
                    </div>
                    

                    {/* Menu section */}
                    <div className='pt-[20%]'>
                         {
                              menuItems.map((items) => (
                                   <Link to={items.path} key={items.id} className='cursor-pointer hover:text-green-400'>
                                        <div className="pl-[15%] mb-10">
                                             <div className="flex items-center space-x-4">
                                                  <items.icon size={24} className="text-[#FFF]" />
                                                  <p className="text-white">{items.page}</p>     
                                             </div>
                                        </div>
                                   </Link>
                              ))
                         }
                    </div>     
               </div>
               
               {/* Logout button */}
               <div className='ml-[15%]'>
                    <button onClick={handleLogout} className='mb-10 flex items-center space-x-2 text-white bg-[#00000042] p-2 rounded-lg'><HiOutlineLogout size={30} /><span>Logout</span></button>
               </div>

          </div>
      );
}
 
export default Sidebar;