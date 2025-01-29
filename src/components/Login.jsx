import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Register from './Register';

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggle, setToggle] = useState(true);

    function handleLoginSubmit(e) {
        e.preventDefault();
        login(email, password);
    }

    function handleToggle() {
        setToggle(!toggle); // This toggles the state directly
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            {toggle ? (
                <div>
                    <div className="top-form">Welcome! Please Login!</div>
                    <br />
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                      <br />
                        <div className="bottom-form">Don't have an account? Sign up{' '}
                            <span onClick={handleToggle} style={{ cursor: 'pointer', color: 'blue' }}>
                                here
                            </span>
                        </div>
                </div>
            ) : (
                <div>
                    <Register />
                    <br />
                      <div className="bottom-form">Already have an account? Login{' '}
                            <span onClick={handleToggle} style={{ cursor: 'pointer', color: 'blue' }}>
                                here
                            </span>
                      </div>
                    
                </div>
            )}
        </>
    );
}

export default Login;