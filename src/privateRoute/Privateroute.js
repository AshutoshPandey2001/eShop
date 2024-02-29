import React from 'react'
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from '../redux/slice/authSlice';

const Privateroute = ({ children }) => {
    const isLoggedin = useSelector(selectIsLoggedIn);
    if (isLoggedin) {
        return children;
    }

    return <Navigate to="/login" />
}

export default Privateroute;