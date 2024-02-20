import axiosInstance from "../utils/axios"

const logIn = async (data: {
    email: string,
    password: string,
}) => {
    const userData = (await axiosInstance.post('/user/singIn', {
        ...data
    })).data;
    return userData;
}

const singUp = async(data: {
    email: string,
    nickname: string,
    password: string,
}) => {
    const userData = (await axiosInstance.post('/user/singUp', {
        ...data
    })).data;
    return userData;
}

export {
    logIn,
    singUp,
}