import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';
import '../styles/EventList.css';

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventService.getAllEvents();
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="event-list-page">
            <Navbar />
            <div className="container">
                <h1>Upcoming Events</h1>
                <div className="events-grid">
                    {events.map(event => (
                        <div key={event.id} className="event-card">
                            <h3>{event.title}</h3>
                            <p className="event-date">{new Date(event.date_time).toLocaleString()}</p>
                            <p className="event-location">{event.location}</p>
                            <Link to={`/events/${event.id}`} className="btn btn-secondary">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventList;
