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
                    <h3>
                        Don't have an account? Sign up{' '}
                        <span onClick={handleToggle} style={{ cursor: 'pointer', color: 'blue' }}>
                            here
                        </span>
                    </h3>
                </div>
            ) : (
                <div>
                    <Register />
                    <h3>
                        Already have an account? Login{' '}
                        <span onClick={handleToggle} style={{ cursor: 'pointer', color: 'blue' }}>
                            here
                        </span>
                    </h3>
                </div>
            )}
        </>
    );
}

export default Login;