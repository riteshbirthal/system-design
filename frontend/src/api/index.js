import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tutorialsApi = {
  getAll: () => api.get('/tutorials'),
  getById: (id) => api.get(`/tutorials/${id}`),
  getByCategory: (category) => api.get(`/tutorials/category/${category}`),
  getByWeek: (week) => api.get(`/tutorials/week/${week}`),
  getByWeekDay: (week, day) => api.get(`/tutorials/week/${week}/day/${day}`),
  create: (data) => api.post('/tutorials', data),
  update: (id, data) => api.put(`/tutorials/${id}`, data),
  delete: (id) => api.delete(`/tutorials/${id}`),
};

export const contentApi = {
  getAll: () => api.get('/content'),
  getById: (id) => api.get(`/content/${id}`),
  getByCategory: (category) => api.get(`/content/category/${category}`),
  getByWeek: (week) => api.get(`/content/week/${week}`),
  getByWeekDay: (week, day) => api.get(`/content/week/${week}/day/${day}`),
  search: (query) => api.get(`/content/search?q=${query}`),
  create: (data) => api.post('/content', data),
  update: (id, data) => api.put(`/content/${id}`, data),
  delete: (id) => api.delete(`/content/${id}`),
};

export const assignmentsApi = {
  getAll: () => api.get('/assignments'),
  getById: (id) => api.get(`/assignments/${id}`),
  getByWeek: (week) => api.get(`/assignments/week/${week}`),
  getByWeekDay: (week, day) => api.get(`/assignments/week/${week}/day/${day}`),
  getWeeklyProject: (week) => api.get(`/assignments/week/${week}/project`),
  create: (data) => api.post('/assignments', data),
  update: (id, data) => api.put(`/assignments/${id}`, data),
  delete: (id) => api.delete(`/assignments/${id}`),
  submit: (id, data) => api.post(`/assignments/${id}/submit`, data),
  getSubmissions: (id) => api.get(`/assignments/${id}/submissions`),
};

export const quizzesApi = {
  getAll: () => api.get('/quizzes'),
  getById: (id) => api.get(`/quizzes/${id}`),
  getByCategory: (category) => api.get(`/quizzes/category/${category}`),
  getByWeek: (week) => api.get(`/quizzes/week/${week}`),
  getByWeekDay: (week, day) => api.get(`/quizzes/week/${week}/day/${day}`),
  getWeeklyQuiz: (week) => api.get(`/quizzes/week/${week}/weekly`),
  create: (data) => api.post('/quizzes', data),
  update: (id, data) => api.put(`/quizzes/${id}`, data),
  delete: (id) => api.delete(`/quizzes/${id}`),
  submit: (id, data) => api.post(`/quizzes/${id}/submit`, data),
  getResults: (id) => api.get(`/quizzes/${id}/results`),
};

export const courseApi = {
  getOverview: () => api.get('/course'),
  getWeek: (week) => api.get(`/course/week/${week}`),
  getDay: (week, day) => api.get(`/course/week/${week}/day/${day}`),
};

export default api;
