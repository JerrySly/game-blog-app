import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import { update } from "lodash";
import { redirect, useNavigate } from "react-router";


const getToken = () => {
  console.log('CREATE AXIOS INSTANCE', localStorage.getItem('token'));
  return localStorage.getItem('token') ?? undefined
}

let axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    Authorization: getToken(),
  },
});


axiosInstance.interceptors.request.use(async (request) => {
  let token = request.headers.Authorization;
  const tokenFromStorage = localStorage.getItem('token');
  if (!token && tokenFromStorage) {
    axiosInstance.defaults.headers['Authorization'] = tokenFromStorage;
    token = tokenFromStorage;
  }
  console.log(request);
  console.log('SEE TOKEN', token, request.url, localStorage.getItem('token'));
  const authRequest = request.url?.includes('/auth')
  if (token && !authRequest) {
    const decodedToken: {
      exp: number,
      _uuid: string,
    } = jwtDecode(token as string);
    console.log('DECODED TOKEN', decodedToken,Date.now(), Date.now() > decodedToken.exp * 1000);
    if (!decodedToken.exp) return request;
    if((Date.now() > decodedToken.exp * 1000) && decodedToken?._uuid) {
      try {
        console.log('TRY GET NEW TOKEN');
        const newToken = (await axiosInstance.get(`/auth/refresh/${decodedToken?._uuid}`, {
          withCredentials: true,
        })).data;
        console.log('SET NEW TOKEN', newToken);
        localStorage.removeItem('token');
        localStorage.setItem('token', newToken);
        request.headers.Authorization = newToken;
      } catch (err: any) {
        console.log('Ошибка тут', err);
        localStorage.removeItem('token');
        window.location.replace('/sing-up');
      }
    }
  }
  return request;
})

axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log('Возвращенная ошибка', error.response.status, error.request.responseURL);
  if (error.response.status === 401 || error.response.status === 403) {
    window.location.replace('/sing-up');
  }
  return Promise.reject({...error});
})


export default axiosInstance;