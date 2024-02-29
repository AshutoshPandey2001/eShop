import React from 'react'
import { Routes, Route } from "react-router-dom";
import Checkout from '../components/checkout/Checkout';
import { Home, Contact, Login, Register, Reset, Cart, OrderHistory, Allproducts, Header, Footer } from '../pages'
import Privateroute from '../privateRoute/Privateroute';
import Defaultlayout from '../layout/defaultlayout/Defaultlayout';


const UserRoutes = () => {
    return (
        <>

            <main className="main">
                <Routes>
                    <Route path="/" element={<Defaultlayout><Home /></Defaultlayout>} />
                    <Route path="/contact" element={<Defaultlayout><Contact /></Defaultlayout>} />
                    <Route path="/cart" element={<Defaultlayout><Cart /></Defaultlayout>} />
                    <Route path="/checkout" element={<Defaultlayout><Privateroute><Checkout /></Privateroute></Defaultlayout>} />
                    <Route path="/myorder" element={<Defaultlayout><Privateroute><OrderHistory /></Privateroute></Defaultlayout>} />
                    <Route path="/allProducts" element={<Defaultlayout><Allproducts /></Defaultlayout>} />

                </Routes>
            </main>
        </>
    )
}

export default UserRoutes;