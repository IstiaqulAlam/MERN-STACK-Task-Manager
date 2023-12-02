import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithStoredCredentials } from './AutoLogin'

const ProfileModal = () => {
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

    return (
        <>
            {userData && (
                <>
                    <div className="modal-container">
                        <div className="modal-box">
                            {userData ? (
                                <>
                                    <p style={{ fontSize: '20px' }}>Your Profile</p>
                                    <br />
                                    <p>First Name: {userData.FirstName}</p>
                                    <br />
                                    <p>Last Name: {userData.LastName}</p>
                                    <br />
                                    <p>Username: {userData.Username}</p>
                                    <br />
                                    <p>Email: {userData.Email}</p>
                                    <br />
                                    <button type="button" onClick={handleLogout}>
                                        Logout
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
