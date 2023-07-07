import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:100" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// user login and register

export const createService = (newService) => API.post("/services", newService);
export const updateService = (id, updatedService) =>
  API.patch(`/services/${id}`, updatedService);
export const deleteService = (id) => API.delete(`/services/${id}`);

//api for events
export const fetchEvent = (id) => API.get(`/events/${id}`);
export const fetchEvents = (page) => API.get(`/events?page=${page}`);
export const fetchEventsBySearch = ({ tags }) =>
  API.get(`/events/search?tags=${tags}`);

export const createEvent = (newEvent) => API.post("/events", newEvent);
export const updateEvent = (id, updatedEvent) =>
  API.patch(`/events/${id}`, updatedEvent);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

//api for others

//api for groups
export const fetchGroups = () => API.get("/api/groups");
export const fetchGroup = (id) => API.get(`/api/groups/${id}`);
export const fetchMyGroups = () => API.get("/api/groups/mygroups");
export const createGroup = (newGroup) => API.post("/api/groups", newGroup);
export const updateGroup = (id, updatedGroup) =>
  API.patch(`/api/groups/${id}`, updatedGroup);
export const deleteGroup = (id) => API.delete(`/api/groups/${id}`);
export const joinGroup = (id, newMember) =>
  API.post(`/api/groups/${id}/joinGroup`, newMember);

//api for user
//user login and register
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
