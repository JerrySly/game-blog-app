import axiosInstance from "../utils/axios"


export const getAllRoles = async () => {
 return await axiosInstance.get('/role');
}