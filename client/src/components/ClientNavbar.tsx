import React from "react";
import { toRem } from '../utils/toRem';
import ZipRecruiterLogo from "../assets/ZipRecruiterLogo";

export const ClientNavbar = () => {
     const navMenuItems = [{ name: "Jobs" }, { name: "Salaries" }, { name: "Profile"} ];

     return (
          <div style={navbarStyle} className="">
               <div style={logoStyle}><ZipRecruiterLogo /></div>

               <div style={menuStyle}>
                    {
                         navMenuItems.map((item) => (
                              <span style={menuItemStyle}>{item.name}</span>
                         ))
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
     margin: `auto 10% auto 0`
}

const menuItemStyle = {
     marginLeft: `${toRem(60)}`,
     fontSize: `${toRem(16)}`
}