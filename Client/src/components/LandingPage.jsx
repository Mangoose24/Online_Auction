import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Premium Auctions
                        <span className="hero-highlight"> Platform</span>
                    </h1>
                    <p className="hero-description">
                        Discover exclusive items and bid in real-time on our secure auction platform
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn btn-primary">
                            Start Bidding
                        </Link>
                        <Link to="/auction" className="btn btn-outline">
                            Browse Auctions
                        </Link>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🔥</div>
                        <h3>Live Bidding</h3>
                        <p>Real-time auction updates and instant bidding</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Platform</h3>
                        <p>Advanced security for safe transactions</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💎</div>
                        <h3>Premium Items</h3>
                        <p>Curated selection of exclusive items</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast Checkout</h3>
                        <p>Quick and easy payment process</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
