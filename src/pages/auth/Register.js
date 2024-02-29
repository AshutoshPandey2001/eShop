import React, { useState } from 'react'
import styles from './auth.module.scss'
import registerImg from "../../assests/register.png"
import { NavLink, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Password do not match")
        } else {
            setIsLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    var user = userCredential.user;
                    console.log(user);
                    setIsLoading(false)
                    toast.success("Registration successful.....");
                    navigate("/login")
                })
                .catch((error) => {
                    toast.error(error.message)
                    setIsLoading(false)
                });
        }

    }
    return (
        <>

            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card >
                    <div className={styles.form}>
                        <h2 >Register</h2>
                        <form onSubmit={registerUser}>
                            <input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder="Confirm password" required value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                            <button type='submit' className='--btn --btn-primary --btn-block '>Register</button>
                            <p>-- or --</p>
                        </form>
                        <span className={styles.register}><p>Already have an account? </p> <NavLink to="/login">Login</NavLink></span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt='Login' width="400px" />
                </div>
            </section>
        </>
    )
}

export default Register;