import React, { useState, useContext, useRef, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import cartContext from '../context/cartContext'
import { IoBagOutline } from 'react-icons/io5'
import { RiCloseLine, RiAlignJustify } from 'react-icons/ri'
import { BASE_URL } from '../../api/baseUrl'

const Navbar = ({ isLoggedIn }) => {
  const [activeComponent, setActiveComponent] = useState('home')
  const [click, setClick] = useState(false)
  const navbarRef = useRef(null)
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  const handleLogoClick = () => {
    setActiveComponent('home')
  }

  const handleComponentClick = component => {
    setActiveComponent(component)
    setClick(false)
    if (component === 'home') {
      navigate('/')
    } else {
      navigate(component)
    }
  }

  const { cartItems, toggleCart,clearCart } = useContext(cartContext)
  const cartQuantity = cartItems.length

  const handleClick = () => setClick(!click)

  const verifyToken = () => {
    const token = JSON.parse(localStorage.getItem('cookies'))
    setToken(token)

    if (token) {
      fetch(`${BASE_URL}/auth/jwt-verify?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            // localStorage.setItem('user', JSON.stringify(data.user))
          } else {
            localStorage.removeItem('cookies')
            localStorage.removeItem('user')
            setToken('')
          }
        })
        .catch(error => {
          console.error('Error verifying token:', error)
          localStorage.removeItem('cookies')
          localStorage.removeItem('user')
          setToken('')
        })
    } else {
      localStorage.removeItem('user')
      setToken('')
    }
  }

  useEffect(() => {
    verifyToken()

    const handleStorageChange = event => {
      if (event.key === 'cookies') {
        verifyToken()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <header id='header'>
      <div className={`mobileMenu ${click ? 'mobileMenu' : 'mobilemenuHide'}`}>
        <ul>
          <li>
            <Link
              onClick={() => handleComponentClick('home')}
              className={activeComponent === 'home' ? 'active' : ''}
              to='/'
            >
              Home
            </Link>
          </li>
          <li
            onClick={() => handleComponentClick('menu')}
            className={activeComponent === 'menu' ? 'active' : ''}
          >
            <Link to='/menu'>Menu</Link>
          </li>
          <li
            onClick={() => handleComponentClick('about')}
            className={activeComponent === 'about' ? 'active' : ''}
          >
            <Link to='/about'>About</Link>
          </li>
          <li
            onClick={() => handleComponentClick('contact')}
            className={activeComponent === 'contact' ? 'active' : ''}
          >
            <Link to='/contact'>Contact</Link>
          </li>
          <li
            onClick={() => handleComponentClick('feedback')}
            className={activeComponent === 'feedback' ? 'active' : ''}
          >
            <Link to='/feedback'>Feedback</Link>
          </li>
        </ul>
      </div>
      <div ref={navbarRef} className='navbar'>
        <div className='left'>
          <div className='nav-icon' onClick={handleClick}>
            {click ? <RiCloseLine size='35' /> : <RiAlignJustify size='27' />}
          </div>
          <Link to='/' onClick={handleLogoClick}>
            <img src={logo} alt='Logo' className='logo' />
          </Link>
        </div>
        <div className='middle'>
          <ul
            className={click ? 'navbar-components active' : 'navbar-components'}
          >
            <li
              onClick={() => handleComponentClick('home')}
              className={activeComponent === 'home' ? 'active' : ''}
            >
              Home
            </li>
            <li
              onClick={() => handleComponentClick('menu')}
              className={activeComponent === 'menu' ? 'active' : ''}
            >
              Foods
            </li>
            <li
              onClick={() => handleComponentClick('about')}
              className={activeComponent === 'about' ? 'active' : ''}
            >
              About
            </li>
            <li
              onClick={() => handleComponentClick('contact')}
              className={activeComponent === 'contact' ? 'active' : ''}
            >
              Contact
            </li>
            <li
              onClick={() => handleComponentClick('feedback')}
              className={activeComponent === 'feedback' ? 'active' : ''}
            >
              Feedback
            </li>
          </ul>
        </div>
        <div className='right'>
          <div
            title='Cart'
            className='cart_icon'
            onClick={() => toggleCart(true)}
          >
            <IoBagOutline size='25' />
            {cartQuantity >= 1 && <span className='badge'>{cartQuantity}</span>}
          </div>
          {isLoggedIn || token ? (
            <Link to='/profile' className='button'>
              Profile
            </Link>
          ) : (
            <Link to='/login' className='button'>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
