import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:100' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
});

//api for services
export const fetchService = (id) => API.get(`/services/${id}`);
export const fetchServices = (page) => API.get(`/services?page=${page}`);
export const fetchServicesBySearch = ({ tags }) => API.get(`/services/search?tags=${tags}`);
// user login and register

export const createService = (newService) => API.post('/services', newService);
export const updateService = (id, updatedService) => API.patch(`/services/${id}`, updatedService);
export const deleteService = (id) => API.delete(`/services/${id}`);

//api for events
export const fetchEvent = (id) => API.get(`/events/${id}`);
export const fetchEvents = (page) => API.get(`/events?page=${page}`);
export const fetchEventsBySearch = ({ tags }) => API.get(`/events/search?tags=${tags}`);

export const createEvent = (newEvent) => API.post('/events', newEvent);
export const updateEvent = (id, updatedEvent) => API.patch(`/events/${id}`, updatedEvent);
export const deleteEvent = (id) => API.delete(`/events/${id}`);


//api for user
//user login and register
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);