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

//api for services
export const fetchService = (id) => API.get(`/services/${id}`);
export const fetchServices = (page, userId = null) =>
  API.get(`/services?page=${page}${userId ? `&userId=${userId}` : ""}`);
export const fetchServicesBySearch = (input) =>
  API.post("/services/search", input);
export const fetchServicesBySorting = (page, sorting) =>
  API.get(`/services/sorting?page=${page}&sorting=${sorting}`);
export const fetchServicesByUser = (userId) =>
  API.get(`/createdservices/${userId}`);

export const createService = (newService) => API.post("/services", newService);
export const updateService = (id, updatedService) =>
  API.patch(`/services/${id}`, updatedService);
export const deleteService = (id) => API.delete(`/services/${id}`);

export const sendEmail = (formData) =>
  API.post(`/services/sendEmail`, formData);

export const sendEmailEvent = (formData) =>
  API.post(`/events/sendEmailEvent`, formData);

//api for events
export const fetchEvent = (id) => API.get(`/events/${id}`);
export const fetchEvents = (page, userId = null) =>
  API.get(`/events?page=${page}${userId ? `&userId=${userId}` : ""}`);
export const fetchEventsBySearch = (input) => API.post("/events/search", input);
export const fetchEventsBySorting = (page, sorting) =>
  API.get(`/events/sorting?page=${page}&sorting=${sorting}`);
export const fetchEventsByUser = (userId) =>
  API.get(`/createdevents/${userId}`);

export const createEvent = (newEvent) => API.post("/events", newEvent);
export const updateEvent = (id, updatedEvent) =>
  API.patch(`/events/${id}`, updatedEvent);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const incrementParticipants = (id) =>
  API.patch(`/events/${id}/increment`);
export const decrementParticipants = (id) =>
  API.patch(`/events/${id}/decrement`);

//api for applications
export const fetchApplicationsByApplicantId = (applicantId) =>
  API.get(`/applications/${applicantId}`);
export const fetchApplicationsByActivityId = (activityId) =>
  API.get(`/applications?&activityId=${activityId}`);
export const createApplication = (newApplication) =>
  API.post("/applications", newApplication);
export const updateApplication = (id, updatedApplication) =>
  API.patch(`/applications/${id}`, updatedApplication);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);

//api for groups
export const fetchGroups = () => API.get("/api/groups");
export const fetchGroup = (id) => API.get(`/api/groups/${id}`);
export const fetchMyGroups = () => API.get("/api/groups/mygroups");
export const createGroup = (newGroup) => API.post("/api/groups", newGroup);
export const addGroupPassword = (id, password) =>
  API.patch(`/api/groups/${id}/addGroupPassword`, password);
export const updateGroup = (id, updatedGroup) =>
  API.patch(`/api/groups/${id}`, updatedGroup);
export const deleteGroup = (id) => API.delete(`/api/groups/${id}`);
export const joinGroup = (id, newMember) =>
  API.post(`/api/groups/${id}/joinGroup`, newMember);
export const verifyGroup = (id, password) =>
  API.post(`/api/groups/${id}/verifyGroup`, password);

//user login and register
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

//api for user
export const modifyPersonalInfo = (id, data) =>
  API.put(`/user/modifyPersonalInfo/${id}`, data);
export const getPersonalInfo = (id) => API.get(`/user/getPersonalInfo/${id}`);
export const updateMembership = (id, data) =>
  API.patch(`/user/updateMembership/${id}`, data);

//api for explore
export const createExplorePost = (newPost) =>
  API.post("/explore/createPost", newPost);
export const getRecommendTags = (keyword, where) =>
  API.get(`/explore/getRecommendTags/${keyword}/${where}`);
export const getPosts = (data) =>
  API.get("/explore/getPosts", { params: data });
export const modifyLikes = (id, data) =>
  API.put(`/explore/modifyLikes/${id}`, data);
export const getSinglePost = (postId) =>
  API.get(`/explore/getSinglePost/${postId}`);
export const deletePost = (postId) =>
  API.delete(`/explore/deletePost/${postId}`);
export const modifyPost = (postId, data) =>
  API.put(`/explore/modifyPost/${postId}`, data);

//api for articles
export const getGroups = (formData = {}) => API.get("/api/groups", formData);
export const getGroupsArticles = (groupId, formData = {}) =>
  API.get(`/api/articles/getGroups/${groupId}`, formData);
export const getGroupInfo = (groupId, formData = {}) =>
  API.get(`/api/groups/${groupId}`, formData);
export const getArticlesInfo = (articlesId, formData = {}) =>
  API.get(`/api/articles/${articlesId}`, formData);
export const delArticles = (articlesId, formData = {}) =>
  API.delete(`/api/articles/${articlesId}`, formData);
export const paArticlesInfo = (articlesId, formData = {}) =>
  API.patch(`/api/articles/${articlesId}`, formData);
export const poArticlesInfo = (formData = {}) =>
  API.post(`/api/articles/`, formData);
export const getUserArticles = (userId, formData = {}) =>
  API.get(`/user/articles/${userId}`, formData);

//api for search
export const fetchGroupsBySearch = (searchQuery) =>
  API.get(`/api/groups/search?searchQuery=${searchQuery || "none"}`);
export const fetchArticlesBySearch = (groupId, searchQuery) =>
  API.get(
    `/api/articles/getGroups/${groupId}/search?searchQuery=${
      searchQuery || "none"
    }`
  );

export const getPopularTags=()=>API.get("/explore/getPopularTags")

