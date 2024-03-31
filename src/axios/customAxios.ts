import { useUserStore } from "@/store/useUserStore";
import axios from "axios";

const customAxios = axios.create()

customAxios.interceptors.request.use(
    function (config) {
      
      const token = useUserStore.getState().authToken
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

export {customAxios}