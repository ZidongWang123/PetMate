import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:100' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    
    return req;
});

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

//api for others

//api for user
//user login and register
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const createExplorePost=(newPost)=>API.post("/explore/createPost",newPost)
export const modifyPofil=(id,data)=>API.put(`/user/modify/${id}`,data)