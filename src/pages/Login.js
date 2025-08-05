import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful');
            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Login</h3>
            <form onSubmit={login}>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-success w-100" type="submit">
                    Login
                </button>
            </form>
            <div className="mt-3 text-center">
                Don't have an account?{' '}
                <Link to="/register" className="btn btn-link">Register</Link>
            </div>
        </div>
    );
};

export default Login;
