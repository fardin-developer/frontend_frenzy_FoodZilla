import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu/Menu'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div style={{backgroundColor:'white'}}>
      <Header />
      <div className='browse-menu firstHome'>
        <div className='browsemenu-heading'>
          <h1>Our Top partners</h1>
        </div>
        <div className='menu-container'>
          <div className='menu-box' >
            <img src={assets.breakfastlogo} alt='' className='menu-image' />
            <div className='menu-details'>
              <h3>Restaurant 1</h3>
              <p>
                In the new era of technology we look in the future with
                certainty and pride for our life.
              </p>
                <Link to='/menu'  className='explore-menu'> Explore Menu</Link>
            </div>
          </div>
          <div className='menu-box' >
            <img src={assets.drinkslogo} alt='' className='menu-image' />
            <div className='menu-details'>
              <h3>Restaurant 2</h3>
              <p>
                In the new era of technology we look in the future with
                certainty and pride for our life.
              </p>
              <a href='#' className='explore-menu'>
                Explore Menu
              </a>
            </div>
          </div>
          <div className='menu-box'>
            <img src={assets.maindisheslogo} alt='' className='menu-image' />
            <div className='menu-details'>
              <h3>Resturant 3</h3>
              <p>
                In the new era of technology we look in the future with
                certainty and pride for our life.
              </p>
              <a href='#' className='explore-menu'>
                Explore Menu
              </a>
            </div>
          </div>
          <div className='menu-box'>
            <img src={assets.snackslogo} alt='' className='menu-image' />
            <div className='menu-details'>
              <h3>Restaurant 4</h3>
              <p>
                In the new era of technology we look in the future with
                certainty and pride for our life.
              </p>
              <a href='#' className='explore-menu'>
                Explore Menu
              </a>
            </div>
          </div>
        </div>
      </div>

     {/* <div>
     <Menu/>
     </div> */}

      <div className='homepage-info'>
        <div className='info-img'>
          <img src={assets.foodposter} alt='' className='foodposter-img' />
        </div>
        <div className='info-part'>
          <h2 className='h2'>Your healthy choice is here.</h2>
          <h5 className='h5'>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur, nemo? Non error iste quae rem repudiandae, placeat perspiciatis deserunt alias esse ad, eaque nemo ratione molestiae necessitatibus architecto perferendis quod. Quam, quis. Autem laudantium eveniet omnis culpa magni ratione ipsam temporibus repellat vitae, quasi qui sed sunt illum deserunt cupiditate nisi molestias delectus nulla! Asperiores voluptate dolor nostrum repudiandae.
          </h5>
          <p>
            We're not just your average canteen. We're a team dedicated to
            providing a convenient and enjoyable dining experience.
          </p>
          <button onClick={()=>{navigate('/about')}} className='aboutus-button'> More About Us</button>
        </div>
      </div>
    </div>
  )
}

export default Home
