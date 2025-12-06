import React, { useState, useEffect } from 'react';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';


const AdminPanel = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_time: '',
        location: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await eventService.getAllEvents();
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await eventService.createEvent(formData);
            fetchEvents(); // refresh list
            setFormData({ title: '', description: '', date_time: '', location: '' });
        } catch (error) {
            console.error("Failed to create event", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await eventService.deleteEvent(id);
                fetchEvents();
            } catch (error) {
                console.error("Failed to delete", error);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container admin-container">
                <h1>Admin Panel</h1>

                <div className="admin-content">
                    <div className="create-event-section">
                        <h2>Create Event</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Date & Time (ISO format, e.g. 2023-12-25T10:00:00)</label>
                                <input type="datetime-local" name="date_time" value={formData.date_time} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input name="location" value={formData.location} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Event</button>
                        </form>
                    </div>

                    <div className="manage-events-section">
                        <h2>Manage Events</h2>
                        <ul className="admin-event-list">
                            {events.map(event => (
                                <li key={event.id} className="admin-event-item">
                                    <span>{event.title}</span>
                                    <button onClick={() => handleDelete(event.id)} className="btn btn-danger btn-small">Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
