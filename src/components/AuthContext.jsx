import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function register(name, email, password) {
        try {
            const response = await axios.post('http://localhost:3001/register', { name, email, password }, { withCredentials: true });

            if (response.data.success) {
                setUser(response.data.user); // Assuming the user data is returned here
                alert(response.data.user.name); // Show success message
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("400");
            } else {
                alert(error);
                console.error('Registration error:', error);
            }
        }
    }

    async function login(email, password) {
        const response = await axios.post('http://localhost:3001/login', { email, password }, { withCredentials: true });

        if (response.data.success) {
            setUser(response.data.user);
        } else {
            alert("Error");
        }
    }

    async function logout() {
        setUser(null);
        const response = await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });

        if (response.data.success) {
            alert('User logged out');
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };