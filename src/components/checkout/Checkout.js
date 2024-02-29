import React from 'react'
import './Checkout.css'
import { useDispatch, useSelector } from "react-redux"
import { selectMyOrder, SET_MY_ORDER } from '../../redux/slice/myorderSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { placeOrderSchema } from './schemas';
import { toast } from "react-toastify";
import { selectcartItems, CLEAR_CART } from '../../redux/slice/cartSlice';
import { db } from '../../firebase/config';
import { selectUserId } from '../../redux/slice/authSlice';


const initalValues = {
    fullName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    state: '',
    pincode: "",
    paymentMode: '',
    totalAmount: '',
    status: '',
    date: '',
    totalItem: [],
    orderId: ''
}

const Checkout = ({ CartItem, clearCart }) => {
    const useruid = useSelector(selectUserId)
    const cartItems = useSelector(selectcartItems)
    const myOrders = useSelector(selectMyOrder);
    // const [checkoutValues, setCheckoutValues] = useState({
    //     fullName: '',
    //     email: '',
    //     mobileNo: '',
    //     address: '',
    //     city: '',
    //     state: '',
    //     pincode: '',
    //     paymentMode: '',

    // })
    const totalPrice = cartItems.reduce((price, item) => price + item.qty * item.price, 0);
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initalValues,
        validationSchema: placeOrderSchema,
        onSubmit: async (Values, action) => {
            values.totalItem = await cartItems;
            values.totalAmount = await totalPrice;
            values.status = 'Order Placed '
            values.orderId = Math.random().toString(36).substr(2, 9);
            console.log('formik', Values);
            // action.resetForm();
            // dispatch(SET_MY_ORDER(Values))
            console.log(useruid);
            if (!myOrders) {
                db.collection('Orders').doc(useruid).set({
                    order: [{ ...Values }]
                }).then(() => {
                    console.log("Document successfully written!");
                })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            } else {
                let order2 = [...myOrders, Values]

                console.log('after', order2);

                db.collection('Orders').doc(useruid).set({
                    order: order2
                }).then(() => {
                    console.log("Document successfully written!");
                })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }

            await dispatch(CLEAR_CART());
            toast.success(`${values.orderId} Your Order Has Successfully Placed`)
            navigate('/myorder');
        }


    });
    // console.log('formik error', errors);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const orderNow = async (e) => {
    //     e.preventDefault();
    //     console.log('Checkout Values', checkoutValues);
    //     dispatch(SET_MY_ORDER(checkoutValues))
    //     await clearCart()
    //     navigate('/myorder');
    // }

    return (
        <>
            {/* <div className='checkout'>

                <section className='checkout_From'>
                    <div>
                        <h1>Billing Address</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='formControl'>
                                <label ><i class="fa fa-user"></i> Full Name</label>
                                <input type="text" placeholder='Enter Your Name' name='fullName' value={values.fullName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.fullName && touched.fullName ? (<p style={{ color: 'red' }}>*{errors.fullName}</p>) : null}
                            </div>

                            <div className='formControl'>
                                <label ><i class="fa fa-envelope"></i> Email</label>
                                <input type="text" name="email" placeholder="john@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {errors.email && touched.email ? (<p style={{ color: 'red' }}>*{errors.email}</p>) : null}
                            </div>
                            <div className='formControl'>
                                <label ><i class="fa fa-phone"></i> Mobile No.</label>
                                <input type="text" name="mobileNo" placeholder="Enter your Mobile No." value={values.mobileNo} onChange={handleChange} onBlur={handleBlur} />
                                {errors.mobileNo && touched.mobileNo ? (<p style={{ color: 'red' }}>*{errors.mobileNo}</p>) : null}

                            </div>
                            <div className='formControl'>
                                <label ><i class="fa fa-address-card-o"></i> Address</label>
                                <input type="text" name="address" placeholder="542 W. 15th Street" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                                {errors.address && touched.address ? (<p style={{ color: 'red' }}>*{errors.address}</p>) : null}

                            </div>
                            <div className='formControl'>
                                <label ><i class="fa fa-institution"></i> City</label>
                                <input type="text" name="city" placeholder="New York" value={values.city} onChange={handleChange} onBlur={handleBlur} />
                                {errors.city && touched.city ? (<p style={{ color: 'red' }}>*  {errors.city}</p>) : null}

                            </div>
                            <div className='formControl state_pincode'>
                                <div class="col-50">
                                    <label >State</label>
                                    <input type="text" name="state" placeholder="NY" value={values.state} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.state && touched.state ? (<p style={{ color: 'red' }}>*{errors.state}</p>) : null}

                                </div>
                                <div class="col-50">
                                    <label >Zip</label>
                                    <input type="text" name="pincode" placeholder="10001" value={values.pincode} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.pincode && touched.pincode ? (<p style={{ color: 'red' }}>*{errors.pincode}</p>) : null}

                                </div>
                            </div>
                            <div className='formControl'>
                                <label >Payment Mode</label>
                                <div className='formControl radio'>
                                    <input type='radio' style={{ width: '18px' }} name='paymentMode' value="cod" onChange={handleChange} onBlur={handleBlur} />
                                    <label style={{ marginLeft: '10px', fontWeight: '300' }}>COD</label>
                                </div>
                                <div className='formControl radio'>
                                    <input type='radio' style={{ width: '18px' }} name='paymentMode' value="card" onChange={handleChange} onBlur={handleBlur} />
                                    <label style={{ marginLeft: '10px', fontWeight: '300' }}>Card Payment</label>
                                </div>
                                <div className='formControl radio'>
                                    <input type='radio' style={{ width: '18px' }} name='paymentMode' value="upi" onChange={handleChange} onBlur={handleBlur} />
                                    <label style={{ marginLeft: '10px', fontWeight: '300' }}>UPI</label>
                                </div>
                                {errors.paymentMode && touched.paymentMode ? (<p style={{ color: 'red' }}>*{errors.paymentMode}</p>) : null}


                            </div>


                            <button type='submit' className='placeorderbtn'>Place Your Order</button>
                        </form>
                    </div>


                </section>

                <section className='cartDetails'>
                    <div className='cart' >
                        <h1>Your Cart</h1>
                        <hr></hr>
                        <div className='forScroll'>

                            {
                                CartItem.map((item, index) => {
                                    const productQty = item.price * item.qty

                                    return (
                                        <div className='all_cart' key={index}>
                                            <p>{item.name.slice(0, 20)}</p>
                                            <p>
                                                ₹{item.price}.00 * {item.qty} =
                                                <span>₹{productQty}.00</span>
                                            </p>

                                        </div>

                                    )
                                })
                            }

                        </div>
                        <hr></hr>
                        <div className='totalprice'>
                            <h4>Total Price :</h4>
                            <h3>₹{totalPrice}.00</h3>
                        </div>
                        <hr></hr>
                    </div>
                </section>

            </div> */}

            <div className='row'>

                <section className='checkout_From  col-xxl-7 col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12 order-xxl-1 order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2'>
                    <div className='formargin'>
                        <h1>Billing Address</h1>
                        <form onSubmit={handleSubmit}>
                            <div className='formControl'>
                                <label ><i className="fa fa-user"></i> Full Name</label>
                                <input type="text" placeholder='Enter Your Name' name='fullName' value={values.fullName} onChange={handleChange} onBlur={handleBlur} />
                                {errors.fullName && touched.fullName ? (<p style={{ color: 'red' }}>*{errors.fullName}</p>) : null}
                            </div>

                            <div className='formControl'>
                                <label ><i className="fa fa-envelope"></i> Email</label>
                                <input type="text" name="email" placeholder="john@example.com" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                {errors.email && touched.email ? (<p style={{ color: 'red' }}>*{errors.email}</p>) : null}
                            </div>
                            <div className='formControl'>
                                <label ><i className="fa fa-phone"></i> Mobile No.</label>
                                <input type="text" name="mobileNo" placeholder="Enter your Mobile No." value={values.mobileNo} onChange={handleChange} onBlur={handleBlur} />
                                {errors.mobileNo && touched.mobileNo ? (<p style={{ color: 'red' }}>*{errors.mobileNo}</p>) : null}

                            </div>
                            <div className='formControl'>
                                <label ><i className="fa fa-address-card-o"></i> Address</label>
                                <input type="text" name="address" placeholder="542 W. 15th Street" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                                {errors.address && touched.address ? (<p style={{ color: 'red' }}>*{errors.address}</p>) : null}

                            </div>
                            <div className='formControl'>
                                <label ><i className="fa fa-institution"></i> City</label>
                                <input type="text" name="city" placeholder="New York" value={values.city} onChange={handleChange} onBlur={handleBlur} />
                                {errors.city && touched.city ? (<p style={{ color: 'red' }}>*  {errors.city}</p>) : null}

                            </div>
                            <div className='formControl state_pincode'>
                                <div class="col-50">
                                    <label >State</label>
                                    <input type="text" name="state" placeholder="NY" value={values.state} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.state && touched.state ? (<p style={{ color: 'red' }}>*{errors.state}</p>) : null}

                                </div>
                                <div className="col-50">
                                    <label >Zip</label>
                                    <input type="text" name="pincode" placeholder="10001" value={values.pincode} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.pincode && touched.pincode ? (<p style={{ color: 'red' }}>*{errors.pincode}</p>) : null}

                                </div>
                            </div>
                            <div className='formControl'>
                                <label >Payment Mode</label>
                                <div className='formControl radio'>
                                    <input type='radio' style={{ width: '18px' }} name='paymentMode' value="cod" onChange={handleChange} onBlur={handleBlur} />
                                    <label style={{ marginLeft: '10px', fontWeight: '300' }}>COD</label>
                                </div>
                                <div className='formControl radio'>
                                    <input type='radio' style={{ width: '18px' }} name='paymentMode' value="card" onChange={handleChange} onBlur={handleBlur} />
                                    <label style={{ marginLeft: '10px', fontWeight: '300' }}>Card Payment</label>
                                </div>
                                <div className='formControl radio'>
                                    <input type='radio' style={{ width: '18px' }} name='paymentMode' value="upi" onChange={handleChange} onBlur={handleBlur} />
                                    <label style={{ marginLeft: '10px', fontWeight: '300' }}>UPI</label>
                                </div>
                                {errors.paymentMode && touched.paymentMode ? (<p style={{ color: 'red' }}>*{errors.paymentMode}</p>) : null}


                            </div>


                            <button type='submit' className='placeorderbtn'>Place Your Order</button>
                        </form>
                    </div>


                </section>

                <section className='cartDetails col-xxl-5 col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12 order-xxl-2 order-xl-2 order-lg-2 order-md-1 order-sm-1 order-1'>
                    <div className='cart' >
                        <h1>Your Cart</h1>
                        <hr></hr>
                        <div className='forScroll'>

                            {
                                cartItems.map((item, index) => {
                                    const productQty = item.price * item.qty

                                    return (
                                        <div className='all_cart' key={index}>
                                            <p>{item.name.slice(0, 20)}</p>
                                            <p>
                                                ₹{item.price}.00 * {item.qty} =
                                                <span>₹{productQty}.00</span>
                                            </p>

                                        </div>

                                    )
                                })
                            }

                        </div>
                        <hr></hr>
                        <div className='totalprice'>
                            <h4>Total Price :</h4>
                            <h3>₹{totalPrice}.00</h3>
                        </div>
                        <hr></hr>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Checkout;