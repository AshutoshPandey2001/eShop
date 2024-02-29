import { useNavigate } from "react-router-dom";
import './App.css'
// Components
// Pages
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../src/redux/slice/authSlice"
import { useEffect, useState } from "react";
import Adminroutes from "./routes/Adminroutes";
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Footer, Header } from "./pages";
// import { Route, Switch } from "react-router"

function App() {
  const isLoggedin = useSelector(selectIsLoggedIn);
  const [userType, setUserType] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user.uid === 'HPYIwdfbwvdGB0u2TOkIcyJL9FO2') {
        setUserType('admin')
      } else {
        setUserType()
      }

    })
  }, [isLoggedin])





  return (
    <>
      <ToastContainer />

      <AuthRoutes />
      {userType === 'admin' ?
        <Adminroutes />
        : <UserRoutes />

      }


      {/* <UserRoutin /> */}
      {/* 

      <main className="main">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart CartItem={CartItem} addToCart={addToCart} decreaseQty={decreaseQty} removefromCart={removefromCart} clearCart={clearCart} />} />
          <Route path="/checkout" element={<Privateroute><Checkout CartItem={CartItem} clearCart={clearCart} /></Privateroute>} />
          <Route path="/myorder" element={<Privateroute><OrderHistory /></Privateroute>} />
          <Route path="/allProducts" element={<Allproducts />} />
          <Route path="/admin" element={<AdminPrivateroute><Admin /></AdminPrivateroute>} >
            <Route path="orders" element={<Orders />} />
            <Route path="" element={<Products />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </main>
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" && window.location.pathname !== "/reset" && window.location.pathname !== "/admin" ? <Footer /> : ""} */}



    </>
  );
}

export default App;
