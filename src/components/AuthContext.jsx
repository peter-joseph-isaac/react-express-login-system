import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function register(name, email, password, confirmPassword) {
        try {
            const response = await axios.post('http://localhost:3001/register', { name, email, password, confirmPassword }, { withCredentials: true });

            if (response.data.success) {
                // If login is successful, update the state with the user data
                alert("Registration successful");
                setUser(response.data.user);  // Store the user data in context/state
            } else {
                // If login fails, display the error message from the backend
                alert(response.data.message || "An error occurred");
            }
        } catch (error) {
            // If there's an error during the request, display the error
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
            console.error("Registration error:", error);
        }
    }

    async function login(email, password) {
        try {
            // Sending a POST request to the backend with the email and password
            const response = await axios.post('http://localhost:3001/login', { email, password }, { withCredentials: true });

            if (response.data.success) {
                // If login is successful, update the state with the user data
                alert("Login successful");
                setUser(response.data.user);  // Store the user data in context/state
            } else {
                // If login fails, display the error message from the backend
                alert(response.data.message || "An error occurred");
            }
        } catch (error) {
            // If there's an error during the request, display the error
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
            console.error("Login error:", error);
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