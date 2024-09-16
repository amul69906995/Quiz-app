import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { authContext } from './context/AuthProvider'
import { useEffect } from 'react'
const ProtectedLayout = () => {
    const {isAuth,user}=useContext(authContext);
    const navigate=useNavigate()
    //console.log(isAuth,user)
    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        }
    }, [isAuth]);
  return (
    <>
    {isAuth ? (<Outlet/>):null}
        
    </>
  )
}

export default ProtectedLayout;
