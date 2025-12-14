import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';


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
                    {events.map(event => {
                        const spotsLeft = (event.capacity || 100) - (event.registrations_count || 0);
                        const isFull = spotsLeft <= 0;
                        const isClosed = event.status && event.status !== 'UPCOMING';

                        return (
                            <div key={event.id} className="event-card">
                                <h3>
                                    {event.title}
                                    {isClosed && <span className="badge badge-closed">{event.status}</span>}
                                    {!isClosed && isFull && <span className="badge badge-full">FULL</span>}
                                </h3>
                                <p className="event-date">{new Date(event.date_time).toLocaleString()}</p>
                                <p className="event-location">{event.location}</p>
                                <p className="event-spots">
                                    <small>
                                        {!isClosed && (isFull ? "No spots left" : `${spotsLeft} spots left`)}
                                    </small>
                                </p>
                                <Link to={`/events/${event.id}`} className="btn btn-secondary">View Details</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EventList;
