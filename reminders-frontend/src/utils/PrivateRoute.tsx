import { Navigate,Outlet } from 'react-router-dom'
import { useState,useContext } from 'react'
import AuthContext from '../context/AuthContext'

function PrivateRoute(){
    let {user} = useContext(AuthContext)
    return !user ? <Navigate to='/login'/> : <Outlet />;
}

export default PrivateRoute;