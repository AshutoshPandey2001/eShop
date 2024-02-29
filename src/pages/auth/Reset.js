import React, { useState } from 'react'
import styles from './auth.module.scss'
import resetImg from "../../assests/forgot.png"
import { NavLink } from 'react-router-dom';
import Card from '../../components/card/Card';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
const Reset = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const resetPassword = (e) => {
        e.preventDefault()
        setIsLoading(true)
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success("Check Your email for Reset a Password....");
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message);
            });
    }
    return (
        <>

            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>

                <div className={styles.img}>
                    <img src={resetImg} alt='Rest Password' width="400px" />
                </div>
                <Card >
                    <div className={styles.form}>
                        <h2 >Rest Password</h2>

                        <form onSubmit={resetPassword}>
                            <input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button type="submit" className='--btn --btn-primary --btn-block '>Rest Password</button>
                            <div className={styles.links}>
                                <p>
                                    <NavLink to="/login">- Login</NavLink>
                                </p>
                                <p>
                                    <NavLink to="/register">- Register</NavLink>
                                </p>
                            </div>

                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Reset;