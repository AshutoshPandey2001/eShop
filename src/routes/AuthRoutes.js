import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Footer, Header, Login, Register, Reset } from '../pages';

const AuthRoutes = () => {
    return (
        <>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<Reset />} />
            </Routes>

        </>
    )
}

export default AuthRoutes;