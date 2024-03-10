import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    Authorization: localStorage.getItem('token') ?? undefined,
  },
});

axiosInstance.interceptors.request.use(async (request) => {
  const token = request.headers.Authorization;
  const authRequest = request.url?.includes('/auth')
  if (token && !authRequest) {
    const decodedToken: {
      exp: number,
      _uuid: string,
    } = jwtDecode(token as string);
    if (!decodedToken.exp) return request;
    if(Date.now() > decodedToken.exp * 1000) {
      const newToken = (await axiosInstance.get(`/auth/refresh/${decodedToken?._uuid}`, {
        withCredentials: true,
      })).data;
      localStorage.removeItem('token');
      localStorage.setItem('token', newToken);
      request.headers.Authorization = newToken;
    }
  }
  return request;
})


export default axiosInstance;