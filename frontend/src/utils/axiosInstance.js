// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Change to your API base URL
  timeout: 5000, // Optional: set a timeout
});

// Interceptor to conditionally attach token from localStorage for authenticated requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Replace 'your_token_name' with your actual token name
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers if it exists
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
