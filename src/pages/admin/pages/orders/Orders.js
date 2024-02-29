import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase/config'
import Table from 'react-bootstrap/Table';
import { async } from '@firebase/util';




const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {


        let temp_data = []
        db.collection('Orders').get().then((res) => {
            console.log('resss', res);
            res.forEach(async (doc) => {
                let data = doc.data();
                console.log(data.order, doc.id)
                let temoobject = {
                    uid: doc.id,
                    order: data.order
                }
                console.log('order2', temoobject);
                await temp_data.push(temoobject)
                setOrders(temp_data)
                console.log('orders', orders)
            })
        }).catch((error) => {
            console.error("Error updating document: ", error);

        });
    }, [])

    const orderStatus = async (e, itemfostatus, item) => {
        console.log('order status', e.target.value, itemfostatus, item);

        item.order.map(async (item1) => {
            if (item1.orderId === itemfostatus.orderId) {
                item1.status = e.target.value;
                console.log(item1);
            }
        });
        db.collection('Orders').doc(item.uid).set({
            order: item.order
        })
    }
    return (
        <>
            <div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>UiD</th>
                            <th>ORDERS</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders?.map((item, index) => {

                                return (
                                    <tr key={index}>
                                        <td>{item.uid}</td>
                                        <td>
                                            <Table bordered >
                                                <thead>
                                                    <tr>
                                                        <th>OrderId</th>
                                                        <th>Name</th>
                                                        <th>Address</th>
                                                        <th>Email</th>
                                                        <th>Mobile No.</th>
                                                        <th>Status</th>
                                                        <th>Products</th>
                                                        <th>Payment Mode</th>
                                                        <th>Total Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        item.order?.map((item1, index1) => {
                                                            return (
                                                                <tr key={index1}>
                                                                    <td>{item1.orderId}</td>
                                                                    <td>{item1.fullName}</td>
                                                                    <td>{item1.address} {item1.city} {item1.pincode} ,{item1.state} </td>
                                                                    <td>{item1.email}</td>
                                                                    <td>{item1.mobileNo}</td>
                                                                    <td><select defaultValue={item1.status} onChange={(e) => orderStatus(e, item1, item)}>
                                                                        <option >Order Placed</option>
                                                                        <option >Order Cancelled</option>
                                                                        <option >Order Confirmed</option>
                                                                        <option >Order Shipped</option>
                                                                        <option >Delivered</option>
                                                                    </select></td>
                                                                    <td>
                                                                        <Table>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Id</th>
                                                                                    <th>Qty</th>
                                                                                    <th>Price</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    item1.totalItem.map((item2, index2) => {
                                                                                        return (
                                                                                            <tr key={index2}>
                                                                                                <td>{item2.id}</td>
                                                                                                <td>{item2.qty}</td>
                                                                                                <td>{item2.price}</td>

                                                                                            </tr>
                                                                                        )
                                                                                    })

                                                                                }
                                                                            </tbody>
                                                                        </Table>
                                                                    </td>
                                                                    <td>{item1.paymentMode}</td>
                                                                    <td>{item1.totalAmount}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>

                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Orders