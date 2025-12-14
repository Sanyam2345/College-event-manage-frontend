import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';


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
            const response = await eventService.registerForEvent(id);
            // Check for smart conflict warning in response
            if (response.data.conflict_warning) {
                setMsg(`Successfully registered! Note: ${response.data.conflict_warning}`);
            } else {
                setMsg('Successfully registered!');
            }
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

                {/* Smart Register Button Logic */}
                {(() => {
                    const isClosed = event.status !== 'UPCOMING';
                    const isFull = (event.registrations_count || 0) >= (event.capacity || 100);

                    if (isClosed) {
                        return <button disabled className="btn btn-disabled">Event Closed ({event.status})</button>;
                    }
                    if (isFull) {
                        return <button disabled className="btn btn-disabled">Event Full</button>;
                    }
                    return (
                        <button onClick={handleRegister} className="btn btn-primary btn-large">
                            Register Now
                        </button>
                    );
                })()}
            </div>
        </div>
    );
};

export default EventDetails;
