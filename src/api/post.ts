import axiosInstance from "../utils/axios"

async function getPost(uuid: string): Promise<any>; 

async function getPost(identify: string | number): Promise<any> {
    return (await axiosInstance.get(`/post/${identify}`)).data;
}

export async function loadPosts(page: number, pageAmount: number) {
    return (await axiosInstance.get('/post', {
        params: {
            page,
            amount: pageAmount,
        }
    })).data;    
}

export default {
    getPost,
    loadPosts,
}