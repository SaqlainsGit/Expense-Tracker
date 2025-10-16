import axios from 'axios';

const BASE_URL = "http://localhost:8080";

const api = axios.create({
    baseURL : BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = 'Bearer '+token;
    }
    return config
})

export const login = (userData) => api.post('/auth/login', userData)
export const register = (userData) => api.post('/auth/register', userData)
export const addExpense = (expense) => api.post('/expense/add', expense)
export const getMyExpense = () => api.get('/expense/my')
export const getAllExpense = () => api.get('/expense/all')
export const deleteExpense = (id) => api.delete(`expense/${id}`)
export const editExpense = (id,expense) => api.put(`/expense/${id}`,expense)
export const getExpenseById = (id) => api.get(`/expense/${id}`)