import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectMyOrder, SET_MY_ORDER, REMOVE_MY_ORDER } from '../../redux/slice/myorderSlice'
import './orderHistory.css'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { db } from '../../firebase/config';
import { selectUserId } from '../../redux/slice/authSlice';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const myOrders = useSelector(selectMyOrder);
    const useruid = useSelector(selectUserId)
    console.log('my orders', myOrders)

    useEffect(() => {
        db.collection('Orders').doc(useruid).get().then((res) => {
            console.log(res.data().order);
            dispatch(SET_MY_ORDER(res.data().order))
        }).catch((error) => {
            console.error("Error updating document: ", error);

        });
    }, [])

    if (myOrders.length === 0) {
        return <h1 className='no-items product notanyOrder'>You Don't Have any order History</h1>
    } else {
        return (

            <div className='myorder'>

                {
                    myOrders.map((order, index) => {
                        return (
                            <div className='myOrderCard' key={index}>
                                <div className='header'>
                                    <h4>Order Id#:- {order.orderId}</h4>
                                    <h3>Status :- {order.status}</h3>
                                </div>
                                <div className='details'>
                                    <div className='customer_Details'>
                                        <h5>Name : {order.fullName}</h5>
                                        <h5>Email : {order.email}</h5>
                                    </div>
                                    <div className='contactDetails'>
                                        <p><b>Address:</b> {order.address}  {order.city} {order.state} ,{order.pincode}</p>
                                        <p><b>Mobile No :-</b>{order.mobileNo}</p>
                                    </div>
                                    <div className='paymentmode'>
                                        <p><b>Payment Mode :</b>{order.paymentMode}</p>
                                    </div>
                                    <div className='items'>
                                        <h4> Total Items: {order.totalItem?.length}</h4>
                                        <Scrollbars style={{ height: '100px' }}>
                                            <div className='allitems'>
                                                {

                                                    order.totalItem.map((item, index) => {
                                                        const productQty = item.price * item.qty
                                                        return (

                                                            <div className='item_card'>
                                                                <p>{item.name}</p>
                                                                <p>
                                                                    ₹{item.price}.00 * {item.qty} =
                                                                    <span>₹{productQty}.00</span>
                                                                </p>
                                                            </div>

                                                        )
                                                    })

                                                }


                                            </div>
                                        </Scrollbars>
                                    </div>
                                </div>
                                <div className='total_Ammount'>
                                    <h4>Total Price :</h4>
                                    <h3>₹{order.totalAmount
                                    }.00</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


}

export default OrderHistory;