import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import { BiLogOut } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import { signOut } from 'firebase/auth';
import Sidemenubar from '../sidemenubar/sidemenubar';
import { auth } from '../../../../firebase/config';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from 'react-toastify';

function Menubar() {
    const navigate = useNavigate();
    const logout = () => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => signOut(auth).then((res) => {
                        toast.success('Logout Successfully')
                        navigate('/login')
                    }).catch((error) => {
                        toast.error(error.message);
                    })
                },
                {
                    label: "No"

                }
            ]
        });
    }
    return (
        <>

            <Navbar bg="dark" variant="dark" fixed="top" className={styles.navbar} style={{ justifyContent: 'space-between' }}>
                <Navbar.Brand style={{ marginLeft: "15px", fontSize: '20px' }}>E Shop Admin Pannel</Navbar.Brand>

                <Button variant="info" className='justify-content-end' style={{ marginRight: "15px", fontSize: '20px' }} onClick={logout}><BiLogOut /></Button>

            </Navbar>
            <Sidemenubar />
        </>
    )
}
export default Menubar;