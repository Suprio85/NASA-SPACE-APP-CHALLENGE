// src/utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Change to your API base URL
  timeout: 5000, // Optional: set a timeout
});

// Optional: Add a request interceptor if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;

//when you want to make a request to your backend API, you can import this axiosInstance and use it to make the request. For example, to make a GET request to the /chapters endpoint, you can do the following:
// npm install js-cookie


// // src/utils/axiosInstance.js

// import axios from 'axios';
// import Cookies from 'js-cookie'; // Import the Cookies library

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000/api/v1', // Change to your API base URL
//   timeout: 5000, // Optional: set a timeout
// });

// // Interceptor to attach token from cookies for authenticated requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('your_token_name'); // Replace with your actual token name
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
//     }
//     return config;
//   },
//   (error) => {
//     // Handle the error
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


