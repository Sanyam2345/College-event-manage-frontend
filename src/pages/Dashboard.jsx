import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import eventService from '../services/eventService';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalEvents: 0
    });

    useEffect(() => {
        // Mocking user stats since we don't have a specific user-dashboard API yet
        // In a real app, we would fetch User specific data here.
        const fetchStats = async () => {
            try {
                const response = await eventService.getAllEvents();
                setStats({ totalEvents: response.data.length });
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <h1 style={{ marginBottom: '1rem', color: '#111827' }}>Dashboard</h1>

                <div className="dashboard-content" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    <div className="card" style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Welcome back, {user?.full_name || 'Student'}!</h3>
                        <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}><strong>Email:</strong> {user?.email}</p>
                        <p style={{ color: '#6b7280' }}><strong>Role:</strong> {user?.is_admin ? 'Administrator' : 'Student'}</p>
                    </div>

                    <div className="card" style={{
                        background: 'white',
                        padding: '2rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Platform Stats</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>{stats.totalEvents}</p>
                        <p style={{ color: '#6b7280' }}>Total Upcoming Events</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
