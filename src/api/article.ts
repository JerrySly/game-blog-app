import axiosInstance from "../utils/axios"

async function getArticle(id: number): Promise<any>;
async function getArticle(uuid: string): Promise<any>; 

async function getArticle(identify: string | number): Promise<any> {
    return (await axiosInstance.get(`/article/${identify}`)).data;
}

export default {
    getArticle,
}