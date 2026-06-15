import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// Function to create Axios instance
const apiService = (): AxiosInstance => {
  // Default options for Axios instance
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      authtoken: Cookies.get('authtoken'),
    },
  };
  // Creating Axios instance
  const instance = axios.create(defaultOptions);

  // Request interceptor
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (err) => Promise.reject(err)
  );

  return instance;
};

// Exporting base Axios instance
export const baseService = apiService();
