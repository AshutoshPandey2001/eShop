import { sidemenuData } from "./sidemenudata";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import styles from "./sidemenubar.module.css";
import Button from 'react-bootstrap/Button';
import { BiLogOut } from "react-icons/bi";

function Sidemenubar() {
    const [open, setopen] = useState(false)
    const toggleOpen = () => {
        setopen(true)
    }
    return (
        <div className={open ? styles.sidenav : styles.sidenavClosed} onMouseLeave={() => setopen(false)} >

            {sidemenuData.map(item => {
                return <NavLink key={item.id} className={styles.sideitem} to={item.link} onMouseOver={toggleOpen} style={({ isActive }) => { return { backgroundColor: isActive ? 'green' : '' } }} >
                    {item.icon}
                    <span className={open ? styles.linkText : styles.linkTextClosed}>{item.text}</span>
                </NavLink>

            })}
            {/* <Button variant="info" className={styles.logoutbutton} style={{ fontSize: '20px', display: 'none' }} ><BiLogOut /></Button> */}

        </div>
    )
}
export default Sidemenubar;