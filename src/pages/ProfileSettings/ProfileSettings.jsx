import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../api/baseUrl';
import './ProfileSettings.css';

const ProfileSettings = ({ user }) => {
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('')

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('cookies'));
        setToken(token)
        if (user && user.name) {
            setName(user.name);
        } else {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            setName(storedUser ? storedUser.name : '');
        }
    }, [user]);

    useEffect(() => {
        setTimeout(() => {
            console.log(name);
        }, 2000);
    }, [name]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleCurrentPasswordChange = (e) => setCurrentPassword(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/auth/update?token=${token}&name=${name}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMessage('Name updated successfully!');
                
                // Update the user object in local storage
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    storedUser.name = name;
                    localStorage.setItem('user', JSON.stringify(storedUser));
                }
            }else {
                setMessage('Failed to update name.');
            }
        } catch (error) {
            console.error('Error updating name:', error);
            setMessage('An error occurred while updating name.');
        }
    };

    const handleBackClick = () => {
        window.location.href = '/profile';
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('New password and confirm password do not match.');
            return;
        }

        try {
            
            const response = await fetch(`${BASE_URL}/auth/update?token=${token}&password=${password}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setMessage('Password changed successfully!');
            } else {
                setMessage('Failed to change password.');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage('An error occurred while changing password.');
        }
    };

    return (
        <div className="ProfileSettingsContainer">
            <div className='profileNav'>
                <div className='profileNavLeft' id='orderNav' onClick={handleBackClick}>
                    <img src='arrow.png' alt='' srcSet='' width='20px' />
                </div>
                <div className='profileNavRight'></div>
            </div>
            <h2>Profile Settings</h2>

            {message && <p>{message}</p>}

            <div className="profile-settings">
                <div className="settings-section">
                    <form onSubmit={handleNameSubmit}>
                        <h3>Update Name</h3>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <button type="submit" id="btn-profile-submit">Update Name</button>
                    </form>
                </div>
                <div className="settings-section">
                    <form onSubmit={handlePasswordSubmit}>
                        <h3>Change Password</h3>
                        <div className="form-group">
                            <label htmlFor="new-password">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                value={password}
                                onChange={handleNewPasswordChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-submit">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
