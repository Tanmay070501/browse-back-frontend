import { useUserStore } from "@/store/useUserStore";
import axios from "axios";

const customAxios = axios.create()

customAxios.interceptors.request.use(
    function (config) {
      
      const token = useUserStore.getState().authToken
      
      if(!token) {
        console.log("Token missing");
        return Promise.reject('Token is missing');
      }
      if (token) {
        // If token exists, add Authorization header to the request
        config.headers['Authorization'] = `Bearer ${token}`;
      } 
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);


customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Perform logout action here
      console.log('Logout due to 401 error');
      const logout = useUserStore.getState().logout
      logout();
    }
    return Promise.reject(error);
  }
);

export {customAxios}