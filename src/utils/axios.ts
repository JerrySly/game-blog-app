import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router";


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
    if((Date.now() > decodedToken.exp * 1000) && decodedToken?._uuid) {
      try {
        const newToken = (await axiosInstance.get(`/auth/refresh/${decodedToken?._uuid}`, {
          withCredentials: true,
        })).data;
        localStorage.removeItem('token');
        localStorage.setItem('token', newToken);
        request.headers.Authorization = newToken;
      } catch (err: any) {
        if (err.response.data.error.name === 'TokenExpiredError') {
          localStorage.removeItem('token');
          redirect('/sing-up');
        }
      }
    }
  }
  return request;
})


export default axiosInstance;