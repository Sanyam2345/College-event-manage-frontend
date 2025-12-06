import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import '../styles/EventDetails.css';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventService.getEventById(id);
                setEvent(response.data);
            } catch (error) {
                console.error("Error fetching event", error);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await eventService.registerForEvent(id);
            setMsg('Successfully registered!');
        } catch (error) {
            setMsg(error.response?.data?.detail || 'Registration failed');
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <div className="event-details-page">
            <Navbar />
            <div className="container event-details-container">
                <h1>{event.title}</h1>
                <p className="event-meta">
                    <span>{new Date(event.date_time).toLocaleString()}</span>
                    <span> | </span>
                    <span>{event.location}</span>
                </p>
                <div className="event-description">
                    <p>{event.description}</p>
                </div>
                {msg && <p className="message">{msg}</p>}
                <button onClick={handleRegister} className="btn btn-primary btn-large">
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default EventDetails;
