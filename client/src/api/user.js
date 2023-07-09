
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:100' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
  
    return req;
  });
API.interceptors.response.use((rsp)=>{
    return rsp.data
})
// user login and register

export const getGroups = (formData={}) => API.get('/api/groups', formData);

export const getGroupsArticles = (groupId,formData={}) => API.get(`/api/articles/getGroups/${groupId}`, formData);

export const getGroupInfo = (groupId,formData={}) => API.get(`/api/groups/${groupId}`, formData);

export const getArticlesInfo = (articlesId,formData={}) => API.get(`/api/articles/${articlesId}`, formData);
export const delArticles = (articlesId,formData={}) => API.delete(`/api/articles/${articlesId}`, formData);



export const paArticlesInfo = (articlesId,formData={}) => API.patch(`/api/articles/${articlesId}`, formData);
export const poArticlesInfo = (formData={}) => API.post(`/api/articles/`, formData);

export const getUserArticles = ( formData={}) => API.get(`/user/articles`, formData);