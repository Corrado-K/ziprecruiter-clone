import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toRem } from '../utils/toRem';
import ZipRecruiterLogo from "../assets/ZipRecruiterLogo";
import { Link } from "react-router-dom";

export const ClientNavbar = () => {

     const { isLoggedIn, logout } = useContext(AuthContext)
     const handleLogout = (e:any) => {
          logout()
     }

     const navMenuItems = [{ name: "Jobs", path: '' }, { name: "My Applications", path: '#' }, { name: "Profile", path: '#' }];

     return (
          <div style={navbarStyle} className="">
               <div style={logoStyle}>
                    <Link to={'/'}>
                         <ZipRecruiterLogo />
                    </Link>
               </div>

               <div style={menuStyle}>
                    {
                         navMenuItems.map((item, index) => (
                              <Link key={index} to={item.path}>
                                   <span style={menuItemStyle}>{item.name}</span>
                              </Link>
                         ))
                    }
                    {
                         isLoggedIn ? 
                              <span onClick={handleLogout} className={`ml-[60px] text-md hover:cursor-pointer hover:text-sky-700 text-[#277f6a]`}>Logout</span>
                         : 
                              <Link to={'/login'}>
                                   <span style={menuItemStyle} className='text-[#277f6a]'>Login</span>
                              </Link>
                    }
                    
               </div>
          </div>
     );
};

const navbarStyle = {
     background: 'white',
     width: '100%',
     height: '2%',
     display: 'flex',
     justifyContent: 'space-between',
     alignContent: 'center',
     margin: 0,
     padding: `${toRem(10)} 0`,
     boxShadow: `0 -1px 1px rgba(0,0,0,.05), 0 3px 6px rgba(0,0,0,.1)`
}

const logoStyle = {
     margin: `0 0 0 10%`
}

const menuStyle = {
     margin: `auto 10% auto 0`,

}

const menuItemStyle = {
     marginLeft: `${toRem(60)}`,
     fontSize: `${toRem(16)}`,
     color: '#000'
}

