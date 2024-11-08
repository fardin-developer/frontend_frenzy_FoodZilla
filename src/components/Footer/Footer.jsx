import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div id="footer">

        <footer className="footer">
          <div className="container">
            <div className="col1">
              <img src="/.png" width='30px' alt="" />
              <h2>Contact Us</h2>
              <p>9864972356</p>
              
            </div>
            <div className="col2">
              <ul className="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">Menu</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Feedback</a></li>
              </ul>
            </div>
            <div className="col3">
              <div className="subCol3">
              <h2>Social Links</h2>
              <ul className="services-icons">
                <li>
                  <a href="#"><i className="ri-facebook-circle-fill"></i></a>
                </li>
                <li>
                  <a href="#"><i className="ri-instagram-fill"></i></a>
                </li>
                <li>
                  <a href="#"><i className="ri-mail-fill"></i></a>
                </li>

              </ul>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum blanditiis officia odio placeat nesciunt ex.</p>
                
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="mekk">
              <p>&copy; frontend-frenzy 2024 - All Rights Reserved</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default Footer
