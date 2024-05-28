import React from "react";
import AuthContext from "../context/AuthContext";
import { Outlet,Navigate,Link } from "react-router-dom";

export default function Header(){

    const {logoutUser,user} = React.useContext(AuthContext)

    return(
        <>
        <header>
            <Link to='/'>Home</Link>
            {user && <div onClick={logoutUser}>Logout</div>}
            <Link to='/register'>Register</Link>
            <Link to ='/login'>Login</Link>
        </header>
        <Outlet />
        </>
        
    )
}