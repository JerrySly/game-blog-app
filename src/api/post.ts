import axiosInstance from "../utils/axios"

async function getPost(uuid: string): Promise<any>; 

async function getPost(identify: string | number): Promise<any> {
    return (await axiosInstance.get(`/post/${identify}`)).data;
}

export default {
    getPost,
}