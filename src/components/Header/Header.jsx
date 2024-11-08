import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('/menu')
  }
  return (
    <div className='header'>
      <div className='header-content'>
        <div className='headh1'>
          <h1>
            {/* Best food for <br></br> your taste */}
          </h1>
        </div>
        <div className='headp'>
          <p>
            Discover delectable  and unforgettable moments in our
            welcoming, culinary haven.
          </p>
        </div>{' '}
        <button className='homepage-button' onClick={handleNavigate}>
          {' '}
          Explore More
        </button>
      </div>
    </div>
  )
}

export default Header
