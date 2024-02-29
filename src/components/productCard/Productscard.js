import React from 'react'
import Card from 'react-bootstrap/Card';
import { AiTwotoneStar, AiOutlineStar, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, selectcartItems } from '../../redux/slice/cartSlice';
import styles from "./ProductsCard.module.scss"


const Productscard = ({ category }) => {
    const dispatch = useDispatch();
    const myOrders = useSelector(selectcartItems);
    console.log('my Cart', myOrders)
    return (
        <div className={styles.products}>
            {category?.map((productItems, index) => {
                return (
                    <Card className={styles.card} key={index}>
                        <Card.Img variant="top" src={productItems.cover} width="100%" height="200px" />
                        <Card.Body>
                            <Card.Title><h4>{productItems.name}</h4></Card.Title>
                            <Card.Text>
                                <div className='rate'>
                                    <AiTwotoneStar color='orange' />
                                    <AiTwotoneStar color='orange' />
                                    <AiTwotoneStar color='orange' />
                                    <AiTwotoneStar color='orange' />
                                    <AiOutlineStar color='orange' />
                                </div>
                            </Card.Text>
                            <div className='price' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4>₹{productItems.price}.00 </h4>
                                <button onClick={() => dispatch(ADD_TO_CART(productItems))}>
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}

export default Productscard