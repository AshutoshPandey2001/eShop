import React from "react"
import "./style.css"
import { AiOutlinePlus, AiOutlineMinus, AiTwotoneDelete } from "react-icons/ai"
import { Scrollbars } from 'react-custom-scrollbars-2';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, DECRESS_QTY, REMOVE_FROM_CART, CLEAR_CART, selectcartItems } from '../../redux/slice/cartSlice';

const Cart = ({ CartItem, addToCart, decreaseQty, removefromCart, clearCart }) => {

  const dispatch = useDispatch();
  const cartProduct = useSelector(selectcartItems);
  console.log('my Cart', cartProduct)

  const navigate = useNavigate()
  //    calucate total of items
  const totalPrice = cartProduct.reduce((price, item) => price + item.qty * item.price, 0)
  const proceedTocheckout = () => {
    navigate("/checkout")
  }

  if (cartProduct.length === 0) {
    return <h1 className='no-items product col-lg-12 text-center'>No Items are add in Cart</h1>
  }
  return (
    <>
      {/* <section className='cart-items'>
        <div className='container d_flex '>


          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            <Scrollbars style={{ height: '500px' }}>
              {CartItem.map((item) => {
                const productQty = item.price * item.qty

                return (
                  <div className='cart-list product d_flex' key={item.id}>
                    <div className='img'>
                      <img src={item.cover} alt='' />
                    </div>
                    <div className='cart-details'>
                      <h3>{item.name}</h3>
                      <h4>
                        ₹{item.price}.00 * {item.qty}
                        <span>₹{productQty}.00</span>
                      </h4>
                    </div>
                    <div className='cart-items-function'>
                      <div className='removeCart'>
                        <button className='removeCart' onClick={() => removefromCart(item)}>
                          <AiTwotoneDelete />
                        </button>
                      </div>

                      <div className='cartControl d_flex'>
                        <button className='incCart' onClick={() => addToCart(item)}>
                          < AiOutlinePlus />
                        </button>
                        <div>
                          <span style={{ fontSize: '15px' }}>{item.qty}</span>
                        </div>
                        <button className='desCart' onClick={() => decreaseQty(item)}>
                          < AiOutlineMinus />
                        </button>
                      </div>
                    </div>


                  </div>
                )
              })}
            </Scrollbars>
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>₹{totalPrice}.00</h3>
            </div>
            <hr></hr>
            <div>
              <button className="checkoutbtn" onClick={() => proceedTocheckout()}>Proceed to Checkout </button>
              <button className="clearcartbtn" onClick={clearCart}>Clear Cart</button>
            </div>

          </div>

        </div>
      </section> */}

      <section className='cart-items'>
        <div className='row'>


          <div className='col-xxl-12 col-xl-12 col-lg-12 col-sm-12 col-12'>

            <Scrollbars style={{ height: '480px' }}>
              {cartProduct.map((item) => {
                const productQty = item.price * item.qty

                return (
                  <div className='cart-list product ' key={item.id}>
                    <div className='img'>
                      <img src={item.cover} alt='' />
                    </div>
                    <div className='cart-details'>
                      <h3>{item.name}</h3>
                      <h4 className="itemqty">
                        ₹{item.price}.00*{item.qty}
                        <span>₹{productQty}.00</span>
                      </h4>
                    </div>
                    <div className='cart-items-function'>
                      <div className='removeCart'>
                        <button className='removeCart' onClick={() => dispatch(REMOVE_FROM_CART(item))}>
                          <AiTwotoneDelete />
                        </button>
                      </div>

                      <div className='cartControl '>
                        <button className='incCart' onClick={() => dispatch(ADD_TO_CART(item))}>
                          < AiOutlinePlus />
                        </button>
                        <div>
                          <span style={{ fontSize: '15px' }}>{item.qty}</span>
                        </div>
                        <button className='desCart' onClick={() => dispatch(DECRESS_QTY(item))}>
                          < AiOutlineMinus />
                        </button>
                      </div>
                    </div>


                  </div>
                )
              })}
            </Scrollbars>
          </div>

          <div className='product col-xxl-12 col-xl-12  col-lg-12 col-sm-12 col-12'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>₹{totalPrice}.00</h3>
            </div>
            <hr></hr>
            <div>
              <button className="checkoutbtn" onClick={() => proceedTocheckout()}>Proceed to Checkout </button>
              <button className="clearcartbtn" onClick={() => dispatch(CLEAR_CART())}>Clear Cart</button>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Cart;
