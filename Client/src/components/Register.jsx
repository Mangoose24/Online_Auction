import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const Navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        Navigate('/auction');
        // Registration logic (commented out for now)
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-80 bg-bg-var(--dark-bg)">
            <div className="card p-4 rounded-4 shadow-lg" style={{ width: '350px' }}>
                <h2 className="text-center text-primary fw-bold mb-3">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3 text-white">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-white">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 text-white">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={handleRegister}>Register</button>
                </form>
                {error && <p className="text-danger mt-3 text-center">{error}</p>}
                <p className="text-center mt-3 text-white">
                    Already have an account? <Link to="/login" className="text-primary mx-5">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
