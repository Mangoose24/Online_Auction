import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // e.preventDefault();
         try {
            localStorage.setItem('user', JSON.stringify({ useremail: email}));
            navigate('/auction');
        } catch (error) {
             setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-90 bg-var(--dark-bg)">
            <div className="card p-4 shadow-lg" style={{ width: '350px' }}>
                <h2 className="text-center text-primary mb-4">Login</h2>
                {error && <p className="alert alert-danger text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold text-white">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold text-white">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3 text-white">
                    Don't have an account? <a href="/register" className="text-primary fw-bold mx-4">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
