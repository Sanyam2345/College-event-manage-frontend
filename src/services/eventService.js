import api from '../api/axios';

const getAllEvents = () => {
    return api.get('/events');
};

const getEventById = (id) => {
    return api.get(`/events/${id}`);
};

const createEvent = (eventData) => {
    return api.post('/events', eventData);
};

const deleteEvent = (id) => {
    return api.delete(`/events/${id}`);
};

const registerForEvent = (id) => {
    return api.post(`/events/${id}/register`);
};

export default {
    getAllEvents,
    getEventById,
    createEvent,
    deleteEvent,
    registerForEvent
};
