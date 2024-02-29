import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { Admin } from '../pages';
import Orders from '../pages/admin/pages/orders/Orders';
import Products from '../pages/admin/pages/products/Products';
import AdminPrivateroute from '../privateRoute/AdminPrivateroute';

const Adminroutes = () => {
    return (
        <>
            <Routes>
                <Route path='' element={<Navigate to="admin" />} />
                <Route path="/admin" element={<AdminPrivateroute><Admin /></AdminPrivateroute>} >
                    <Route path="orders" element={<Orders />} />
                    <Route path="" element={<Navigate to="products" />} />
                    <Route path="products" element={<Products />} />
                </Route>
            </Routes>

        </>
    )
}

export default Adminroutes;