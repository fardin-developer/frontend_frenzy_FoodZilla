import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import Gravatar from 'react-gravatar'


const Profile = ({user}) => {
  const [user1, setUser] = useState({
   
  });
  useEffect(() => {
    if (user && user.name) {
    } else {
        const getUser = JSON.parse(localStorage.getItem('user'));
        setUser(getUser)
    }
}, [user]);
  
  const navigate = useNavigate();



  const handleBackClick = () => {
    navigate('/')
  }
  const handleSignout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('cookies')
    localStorage.removeItem('total')
    navigate('/');
    window.location.reload();
  }

  return (
    <>
      <div>
        <div className='profile-container'>
          <div className='profileNav'>
            <div className='profileNavLeft' onClick={handleBackClick}>
              <img src='arrow.png' alt='' srcSet='' width='20px' />
            </div>
            <div className='profileNavRight'></div>
          </div>
          <div className='profilebottom'>
            <div className='profileData'>
              <div className='profImg' onClick={()=>{alert('to view your avatar, link your email with gravatar.com')}}>
              <Gravatar className='profile-image' email={user?.email||user1.email} size={150} />

              </div>
              <div className='profile-header'>
              <h2 className='profile-name'>{user?.name || user1?.name}</h2>
              <p className='profile-activity'>{user?.email|| user1.email}</p>
              </div>
              {/* <div className='profileReport'>
                <div className='profileReportLeft'>100</div>
                <div className='profileReportRight'>100</div>
              </div> */}
            </div>
            <div className='profmenu'>
              <div className='profile-options'>
                <div className='profile-option' onClick={()=>{navigate('/transaction-history')}}>
                  <div className='profile-optionLeft'>
                    <span className='icon'>💰</span>
                    <p>Payments</p>
                  </div>
                  <span>
                    {' '}
                    <img
                      className='rightarrow'
                      src='/right-arrow.png'
                      alt=''
                    />{' '}
                  </span>
                </div>
                <div className='profile-option' onClick={()=>{navigate('/profile-settings')}}>
                  <div className='profile-optionLeft' >
                    <span className='icon'>⚙️</span>
                    <p>Profile Settings</p>
                  </div>
                  <span> <img className='rightarrow' src="/right-arrow.png" alt="" /> </span>

                </div>
                <div className='profile-option' onClick={()=>{navigate('/order-history')}}>
                  <div className='profile-optionLeft'>
                    <span className='icon'>🛒</span>
                    <p>Order History</p>
                  </div>
                  <span> <img className='rightarrow' src="/right-arrow.png" alt="" /> </span>

                </div>
                <div className='profile-option' onClick={()=>{navigate('/booking')}}>
                <div className='profile-optionLeft'>
                  <span className='icon'>📅</span>
                  <p>Booking</p>
                  </div>
                  <span> <img className='rightarrow' src="/right-arrow.png" alt="" /> </span>

                </div>
              </div>
              <button className='sign-out' onClick={handleSignout}><span className='sign-out-span'>Sign Out</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
