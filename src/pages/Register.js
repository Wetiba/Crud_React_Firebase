import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration successful');
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Register</h3>
            <form onSubmit={register}>
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
                <button className="btn btn-primary w-100" type="submit">
                    Register
                </button>
            </form>
            <div className="mt-3 text-center">
                Already have an account?{' '}
                <Link to="/login" className="btn btn-link">Login</Link>
            </div>
        </div>
    );
};

export default Register;
