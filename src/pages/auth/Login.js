import React, { useState } from 'react'
import styles from './auth.module.scss'
import loginImg from "../../assests/login.png"
import { NavLink, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa"
import Card from '../../components/card/Card';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db } from '../../firebase/config';
import { useDispatch, useSelector } from "react-redux"
import { selectMyOrder, SET_MY_ORDER, REMOVE_MY_ORDER, } from '../../redux/slice/myorderSlice'
import { SET_ADMIN_LOGIN } from '../../redux/slice/authSlice';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(user);

                if (user.uid === 'HPYIwdfbwvdGB0u2TOkIcyJL9FO2') {
                    setIsLoading(false)
                    toast.success("Login successful.....");
                    dispatch(SET_ADMIN_LOGIN())
                    navigate('/admin')

                } else {
                    setIsLoading(false)
                    toast.success("Login successful.....");
                    db.collection('Orders').doc(user.uid).get().then((res) => {
                        console.log(res.data().order);
                        dispatch(SET_MY_ORDER(res.data().order))
                    }).catch((error) => {
                        console.error("Error updating document: ", error);

                    });
                    navigate("/")
                }

            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error.message)

            });
    }

    const signInwithGoogle = () => {
        setIsLoading(true)
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
                const user = result.user;
                console.log(user);
                setIsLoading(false)
                toast.success("Login successful.....");
                db.collection('Orders').doc(user.uid).get().then((res) => {
                    console.log(res.data().order);
                    dispatch(SET_MY_ORDER(res.data().order))
                }).catch((error) => {
                    console.error("Error updating document: ", error);

                });
                navigate("/")

            }).catch((error) => {
                setIsLoading(false)
                toast.error(error.message)

            });
    }
    return (
        <>

            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>

                <div className={styles.img}>
                    <img src={loginImg} alt='Login' width="400px" />
                </div>
                <Card >
                    <div className={styles.form}>
                        <h2 >Login</h2>

                        <form onSubmit={loginUser}>
                            <input type="text" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type='submit' className='--btn --btn-primary --btn-block '>Login</button>
                            <div className={styles.links}>
                                <NavLink to="/reset">Reset Pasword</NavLink>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button className='--btn --btn-danger --btn-block ' onClick={signInwithGoogle}> <FaGoogle color="#fff" />Login With Google </button>
                        <span className={styles.register}><p>Don't have an account? </p> <NavLink to="/register">Register</NavLink></span>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login;