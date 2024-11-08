import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Frontend Frenzy</h1>
        <p>Welcome to Frontend Frenzy, your go-to platform for discovering the best restaurants and delicious food options around you!</p>
        <p>Frontend Frenzy is dedicated to connecting food lovers with their favorite restaurants. Our platform offers a wide range of dining options, from quick bites to gourmet experiences, all delivered straight to your door.</p>
        
        <h2>Key Features</h2>
        <ul>
          <li><strong>Vast Selection of Restaurants:</strong> Explore a diverse selection of restaurants and cuisines to satisfy every craving.</li>
          <li><strong>Seamless Ordering:</strong> Browse menus and place your order with ease.</li>
          <li><strong>Secure Payments:</strong> We use Razorpay for fast and secure online payments, ensuring your transactions are safe.</li>
          <li><strong>Real-time Order Tracking:</strong> Stay updated with real-time tracking as your food is prepared and delivered to you.</li>
          <li><strong>User-Friendly Interface:</strong> Enjoy an intuitive design that makes browsing, ordering, and tracking simple and enjoyable.</li>
        </ul>
        
        <p>Visit our main website at <a href="/" target="_blank" rel="noopener noreferrer">Frontend Frenzy</a> to learn more about our services and how we connect food lovers with their favorite restaurants.</p>
        
        <p>We are constantly working to enhance your food ordering experience. Thank you for choosing Frontend Frenzy for your dining needs. Happy ordering!</p>
      </div>
    </div>
  );
};

export default About;
