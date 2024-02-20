import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    Authorization: localStorage.getItem('token') ?? undefined,
  }
});


export default axiosInstance;