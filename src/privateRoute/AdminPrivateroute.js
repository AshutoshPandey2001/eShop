import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useDispatch, useSelector } from "react-redux"
import { selectAdminLoggedin, SET_ADMIN_LOGIN } from '../redux/slice/authSlice'
import { Admin } from '../pages'
import Orders from '../pages/admin/pages/orders/Orders'
import Products from '../pages/admin/pages/products/Products'


const AdminPrivateroute = ({ children }) => {
    const adminLoggin = useSelector(selectAdminLoggedin)
    if (adminLoggin) {
        return children
    }
    return children
    // <Navigate to="/login" />
}


export default AdminPrivateroute;