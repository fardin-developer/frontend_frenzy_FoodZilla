import React from 'react';
import Lottie from 'react-lottie';
import animationData from '/public/lotti-animation.json'; 
import './Contact.css';
import FloatingWhatsAppButton from '../../components/FloatingButton/FloatingButton';
const Contact = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className='contaxtUspage'>
      <div className="left">
        <div className="contactBox">
          <h2>Contact Us</h2>
          <input type="text" name='name' placeholder="Your Name" />
          <input type="email" name='email' placeholder="Your Email" />
          <textarea name="message" placeholder="Your Message" cols="30" rows="10"></textarea>
          <button>Send Message</button>
        </div>
      </div>
      <div className="right">
        <Lottie className='lottie' options={defaultOptions} />
      </div>
      <FloatingWhatsAppButton/>

    </div>
  );
};

export default Contact;
