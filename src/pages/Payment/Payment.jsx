import React from 'react'
import PaymentButton from '../../components/paymentButton/Payment'
import './payment.css'

const Payment = () => {
  const total = localStorage.getItem('total')
  console.log(total);
  return (
    <div className='payment'>
      <div className='paymentBox'>
        <h1>Amount ₹ {total}</h1>

        <div className='paymentImg'>
          <img src='payment1.webp' alt='' draggable ="false"/>
        </div>
        <span>
          <h2>Or</h2>
        </span>
        <div className='payBtn'>
          <PaymentButton total ={total}/>
        </div>
      </div>
    </div>
  )
}

export default Payment
