import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithStoredCredentials } from './AutoLogin'

const ProfileModal = ({ user, setShowProfileModal }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const fetchUserData = async () => {
        try {
            const loginResponse = await loginWithStoredCredentials();

            // Check if login was successful
            if (loginResponse && loginResponse.msg && loginResponse.msg.length > 0) {
                const user = loginResponse.msg[0];
                setUserData(user);
            } else {
                console.error('Login failed or stored credentials not found');
            }
        } catch (error) {
            console.error(`Error fetching user data: ${error}`);
        }
    };
    if (!userData) {
        fetchUserData();
    }


    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/');
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            //Delete account logic?
            navigate('/');
        }
    };

    return (
        <>
            {userData && (
                <>
                    <div id="overlay" onClick={() => setShowProfileModal(false)}></div>
                    <div className="modal-container">
                        <div className="modal-box">
                            {userData ? (
                                <>
                                    <p>User Information</p>
                                    <p>First Name: {userData.FirstName}</p>
                                    <p>Last Name: {userData.LastName}</p>
                                    <p>Username: {userData.Username}</p>
                                    <p>Email: {userData.Email}</p>
                                    <button type="button" onClick={handleLogout}>
                                        Logout
                                    </button>
                                    <button type="button" onClick={handleDeleteAccount}>
                                        Delete Account
                                    </button>
                                </>
                            ) : (
                                <p>Loading user data...</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
export default ProfileModal;
