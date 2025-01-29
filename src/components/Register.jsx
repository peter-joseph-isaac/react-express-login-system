import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function Register() {
    const { register } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        register(name, email, password);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleConfirmChange(e) {
        setConfirm(e.target.value);
    }

    return (
        <>
            Hey there!
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Display Name"
                    required
                />
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
                <input
                    type="password"
                    value={confirm}
                    onChange={handleConfirmChange}
                    placeholder="Confirm Password"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <h3>
                Already have an account? Login <a href="/login">here</a>
            </h3>
        </>
    );
}

export default Register;