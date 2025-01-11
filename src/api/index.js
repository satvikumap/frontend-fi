// src/api/index.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-fri.onrender.com/api/v1', // Update with your backend URL
    withCredentials: true, // If you are handling cookies or sessions
});

export default api;
