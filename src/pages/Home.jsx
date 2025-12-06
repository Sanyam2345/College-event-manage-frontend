import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <div className="hero-section">
                <h1>Elevate Your College Experience</h1>
                <p>Join the most exciting events, workshops, and gatherings happening on campus. Connect, learn, and grow with us.</p>
                <div className="hero-buttons">
                    <Link to="/events" className="btn btn-primary btn-large">Browse Events</Link>
                    <Link to="/register" className="btn btn-outline btn-large">Get Started</Link>
                </div>
            </div>
            {/* Optional: Add a features section here for more content */}
        </div>
    );
};

export default Home;
