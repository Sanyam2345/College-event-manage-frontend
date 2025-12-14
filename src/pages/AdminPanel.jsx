import React, { useState, useEffect } from 'react';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';


const AdminPanel = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_time: '',
        location: '',
        capacity: 100 // Default capacity
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

    const [editingId, setEditingId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await eventService.updateEvent(editingId, formData);
                setEditingId(null);
            } else {
                await eventService.createEvent(formData);
            }
            fetchEvents(); // refresh list
            setFormData({ title: '', description: '', date_time: '', location: '', capacity: 100, status: 'UPCOMING' });
        } catch (error) {
            console.error("Failed to save event", error);
        }
    };

    const handleEdit = (event) => {
        setEditingId(event.id);
        const formattedDate = new Date(event.date_time).toISOString().slice(0, 16); // Format for datetime-local
        setFormData({
            title: event.title,
            description: event.description,
            date_time: formattedDate,
            location: event.location,
            capacity: event.capacity,
            status: event.status
        });
        window.scrollTo(0, 0); // Scroll to form
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ title: '', description: '', date_time: '', location: '', capacity: 100, status: 'UPCOMING' });
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
                        <h2>{editingId ? 'Edit Event' : 'Create Event'}</h2>
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
                            <div className="form-group">
                                <label>Capacity (Max Registrations)</label>
                                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required min="1" />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status || 'UPCOMING'} onChange={handleChange}>
                                    <option value="UPCOMING">UPCOMING</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">{editingId ? 'Update Event' : 'Create Event'}</button>
                                {editingId && <button type="button" onClick={handleCancelEdit} className="btn btn-secondary" style={{ marginLeft: '10px' }}>Cancel Edit</button>}
                            </div>
                        </form>
                    </div>

                    <div className="manage-events-section">
                        <h2>Manage Events</h2>
                        <ul className="admin-event-list">
                            {events.map(event => (
                                <li key={event.id} className="admin-event-item">
                                    <div className="event-info">
                                        <span><strong>{event.title}</strong></span>
                                        <span className="event-stats">
                                            (Registered: {event.registrations_count || 0} / {event.capacity || 100})
                                            {event.status && <span className={`status-badge ${event.status.toLowerCase()}`}>{event.status}</span>}
                                        </span>
                                    </div>
                                    <div className="event-actions">
                                        <button onClick={() => handleEdit(event)} className="btn btn-secondary btn-small" style={{ marginRight: '5px' }}>Edit</button>
                                        <button onClick={() => handleDelete(event.id)} className="btn btn-danger btn-small">Delete</button>
                                    </div>
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
