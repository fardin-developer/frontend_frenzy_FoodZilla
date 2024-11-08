import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Menu from './pages/Menu/Menu'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Payment from './pages/Payment/Payment'
import Feedback from './pages/Feedback/Feedback'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import { CartProvider } from './components/context/cartContext'
import Profile from './components/profile/Profile'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import TransactionHistory from './pages/TransactionHistory/TransactionHistory'
import ProfileSettings from './pages/ProfileSettings/ProfileSettings'
import Booking from './pages/Booking/Booking'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const location = useLocation()

  const showNavbar = () => {
    const noNavbarRoutes = ['/login', '/register', '/profile', '/order-history', '/transaction-history', '/profile-settings','/booking']
    return !noNavbarRoutes.includes(location.pathname)
  }
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <CartProvider>
      <div className='app' style={{ marginTop: showNavbar() ? '100px' : '0px' }}>
        {showNavbar() && <Navbar isLoggedIn={isLoggedIn} />}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile user ={user}/>} />
          <Route path='/profile-settings' element={<ProfileSettings  user ={user}/>} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/order-history' element={<OrderHistory />} />
          <Route path='/booking' element={<Booking/>} />
          <Route path='/transaction-history' element={<TransactionHistory />} />
        </Routes>
        {
          showNavbar() && <Footer />
        }
      </div>
    </CartProvider>
  )
}

export default App
