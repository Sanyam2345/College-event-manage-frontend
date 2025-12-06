import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios'; // Use the configured axios instance


const Home = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const response = await api.get('/events/upcoming');
                setUpcomingEvents(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch upcoming events:", err);
                setError("Failed to load events."); // Fail silently or show generic error
                setLoading(false);
            }
        };

        fetchUpcomingEvents();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="home-page">
            <Navbar />

            {/* Hero Section */}
            <div className="hero-section">
                <h1>Elevate Your College Experience</h1>
                <p>Join the most exciting events, workshops, and gatherings happening on campus. Connect, learn, and grow with us.</p>
                <div className="hero-buttons">
                    <Link to="/events" className="btn btn-primary btn-large">Browse Events</Link>
                    <Link to="/register" className="btn btn-outline btn-large">Get Started</Link>
                </div>
            </div>

            {/* Upcoming Events Section */}
            <div className="upcoming-events-section">
                <h2 className="section-title">Upcoming Events</h2>

                {loading ? (
                    <div className="text-center">Loading events...</div>
                ) : error ? (
                    <div className="no-events-message">No upcoming events available.</div>
                ) : upcomingEvents.length === 0 ? (
                    <div className="no-events-message">No upcoming events available.</div>
                ) : (
                    <div className="events-grid">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-date">{formatDate(event.date_time)}</div>
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-description">{event.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default Home;
