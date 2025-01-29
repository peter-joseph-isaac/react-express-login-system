import React from 'react';
import { useAuth } from './AuthContext';

function Protected() {
    const { user } = useAuth();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
    }

    return (
        <>
            <div>
                Welcome, {user.name}, {user.email} YEAH <br />
                <img src={user.avi} alt="User Avatar" />
            </div>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Protected;