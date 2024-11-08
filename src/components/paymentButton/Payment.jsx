import React from 'react'

const PaymentButton = ({total}) => {
  const upiId = '9742870340m@pnb'
  const amount = 100
  const payeeName = 'Fardin Mustaque'
  const transactionNote = 'Payment for services'

  const tryOpenUrl = (url, fallbackUrl) => {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.src = url

    setTimeout(() => {
      document.body.removeChild(iframe)
      if (fallbackUrl) {
        tryOpenUrl(fallbackUrl)
      }
    }, 1000)
  }

  const handlePaymentClick = () => {
    const isAndroid = /android/i.test(navigator.userAgent)
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    if (isAndroid || isIOS) {
      const gpayUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}&pn=Google Pay&tr=gpay`
      const phonepeUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}&pn=PhonePe&tr=phonepe`
      const whatsappUrl = `upi://pay?pa=${upiId}&pn=${payeeName}&am=${amount}&cu=INR&tn=${transactionNote}&pn=WhatsApp&tr=whatsapp`

      tryOpenUrl(gpayUrl, phonepeUrl, whatsappUrl)
    } else {
      alert('UPI payment is only supported on Android and iOS devices.')
    }
  }

  const btnCSS = {
    background: 'linear-gradient(45deg, #ff6b6b, #f06595)',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '12px 24px',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
    WebkitBoxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
    MozBoxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)'
  }

  const btnHoverCSS = {
    background: 'linear-gradient(45deg, #f06595, #ff6b6b)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.06)',
    transform: 'translateY(-2px)'
  }

  return (
    <div>
      <button style={btnCSS} onClick={handlePaymentClick}>
        Pay ₹{total} via UPI
      </button>
    </div>
  )
}

export default PaymentButton
