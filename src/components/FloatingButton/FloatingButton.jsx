import React from 'react';
import './FloatingWhatsAppButton.css';

const FloatingWhatsAppButton = () => {
    return (
        <>
            <div className='rectangle '>
                <h3>+919864972356</h3>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/9864972356" className="floating-whatsapp-button" target="_blank" rel="noopener noreferrer">
                    <img src="/social.png" alt="WhatsApp" />
                </a>
            </div>
        </>

    );
};

export default FloatingWhatsAppButton;
