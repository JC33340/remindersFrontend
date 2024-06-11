import React from "react";
import AuthContext from "../context/AuthContext";
import { Outlet,Navigate,Link } from "react-router-dom";

export default function Header(){

    const {logoutUser,user} = React.useContext(AuthContext)

    return(
        <>
        <header>
            <Link className='headerLink' to='/'>Home</Link>
            <div className="header-right-div">
                {!user && 
                    <>
                        <Link className='headerLink' to ='/login'>Login</Link>
                        <Link className='headerLink' to='/register'>Register</Link>
                    </>    
                }
                
                {user && <div className="headerLink" onClick={logoutUser}>Logout</div>}
            </div>
            
        </header>
        <Outlet />
        </>
        
    )
}