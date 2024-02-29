import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss"
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_ADMIN_LOGIN } from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { selectcartItems } from "../../redux/slice/cartSlice";
import { REMOVE_MY_ORDER } from "../../redux/slice/myorderSlice";


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

// const cart = (
//   // <span className={styles.cart}>
//   //   <Link to="/cart">
//   //     cart
//   //     <FaShoppingCart size={20} />
//   //     <p>{CartItem?.length === 0 ? "0" : CartItem.length}</p>
//   //   </Link>
//   // </span>
// );
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")
const Header = ({ CartItem }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [usrName, setUsrName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectcartItems)

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {


      if (user) {
        if (user.uid === 'W1XMNZfgibMdFiwKRNL7pQdSBWP2') {
          console.log('Do nothing');
        } else {
          if (user.displayName == null) {
            const u1 = user.email.substring(0, user.email.indexOf("@"))
            const uName = u1.charAt(0).toLocaleUpperCase() + u1.slice(1)
            console.log(uName);
            setUsrName(uName)
          } else {
            setUsrName(user.displayName)
          }
          console.log(usrName)
          dispatch(SET_ACTIVE_USER({
            email: user.email,
            userName: !user.displayName ? usrName : user.displayName,
            userID: user.uid,
          }))
        }
      } else {
        setUsrName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [])
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  };


  const hideMenu = () => {
    setShowMenu(false)
  };

  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successfully .......")
      navigate("/login")
      dispatch(REMOVE_MY_ORDER())
    }).catch((error) => {
      toast.error(error.message)
    });
  }



  return (
    <>
      <header className={styles.fixed}>
        <div className={styles.header}>
          {logo}
          <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
            <div className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`} onClick={hideMenu}> </div>
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                <NavLink to="/" className={activeLink}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>Contact Use</NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>Login</NavLink>
                </ShowOnLogout>
                <ShowOnLogin>
                  <NavLink style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi,{usrName}
                  </NavLink>
                  {/* <NavLink to="/register" className={activeLink}>Register</NavLink> */}

                  <NavLink to="/myorder" className={activeLink}>My order</NavLink>

                  <NavLink onClick={logoutUser} >Logout</NavLink>
                </ShowOnLogin>
              </span>
              <span className={styles.cart}>
                <Link to="/cart">
                  cart
                  <FaShoppingCart size={20} />
                  <p>{cartItems?.length === 0 ? "0" : cartItems.length}</p>
                </Link>
              </span>
            </div>

          </nav>
          <div className={styles["menu-icon"]}>
            <span className={styles.cart}>
              <Link to="/cart">
                cart
                <FaShoppingCart size={20} />
                <p>{cartItems?.length === 0 ? "0" : cartItems.length}</p>
              </Link>
            </span>
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>

    </>

  );
};

export default Header;
