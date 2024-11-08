import React, { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../api/baseUrl'
import cartContext from '../context/cartContext'
import './Cart.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const {
    isCartOpen,
    cartItems,
    toggleCart,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart
  } = useContext(cartContext)
  const [items, setItems] = useState([])
  const [visible, setVisible] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const formattedItems = cartItems.map(item => ({
      meal: item._id,
      amount: item.quantity
    }))
    setItems(formattedItems)
  }, [cartItems])

  useEffect(() => {
    const docBody = document.body
    isCartOpen
      ? docBody.classList.add('overflow_hide')
      : docBody.classList.remove('overflow_hide')
  }, [isCartOpen])

  useEffect(() => {
    const outsideClose = e => {
      if (e.target.id === 'cart') {
        toggleCart(false)
      }
    }

    window.addEventListener('click', outsideClose)

    return () => {
      window.removeEventListener('click', outsideClose)
    }
  }, [toggleCart])

  const cartQuantity = cartItems.length
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleOrder = async () => {
    try {
        setVisible(false)

      const orderData = { items: items }
      console.log(orderData)

      const token = JSON.parse(localStorage.getItem('cookies'));
      if (!token) {
        navigate('/login')
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios.post(
        `${BASE_URL}/orders`,
        orderData,
        config
      )
      console.log('Order response:', response.data);
      localStorage.setItem('total',cartTotal)
      clearCart()
      navigate('/payment')
    } catch (error) {
      console.error('Error placing order:', error)
    }
  }

  return (
    <>
      {isCartOpen && (
        <div id='cart'>
          <div className='cart_content'>
            <div className='cart_head'>
              <h2>
                Cart <small>({cartQuantity})</small>
              </h2>
              <div
                title='Close'
                className='close_btn'
                onClick={() => toggleCart(false)}
              >
                <span>&times;</span>
              </div>
            </div>

            <div className='cart_body'>
              {cartQuantity === 0 ? (
                <h2>Cart is empty</h2>
              ) : (
                cartItems.map((item, index) => {
                  const { _id, image, name, price, quantity } = item
                  const itemTotal = price * quantity

                  return (
                    <div className='cart_items' key={index}>
                      <figure className='cart_items_img'>
                        <img src={image} alt='product-img' />
                      </figure>

                      <div className='cart_items_info'>
                        <h4>{name}</h4>
                        <h3 className='price'>
                          ₹ {itemTotal.toLocaleString()}
                        </h3>
                      </div>

                      <div className='cart_items_quantity'>
                        <span onClick={() => decrementItem(_id)}>&#8722;</span>
                        <b>{quantity}</b>
                        <span onClick={() => incrementItem(_id)}>&#43;</span>
                      </div>

                      <div
                        title='Remove Item'
                        className='cart_items_delete'
                        onClick={() => removeItem(_id)}
                      >
                        <span>&times;</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className='cart_foot'>
              <h3>
                <small>Total:</small>
                <b>₹ {cartTotal.toLocaleString()}</b>
              </h3>

              {visible ? (
                <button
                  type='button'
                  className='checkout_btn'
                  disabled={cartQuantity === 0}
                  onClick={handleOrder}
                >
                  Checkout
                </button>
              ):( <button
                type='button'
                className='checkout_btn'
                disabled={cartQuantity === 0}
              >
                Loading...
              </button>)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
