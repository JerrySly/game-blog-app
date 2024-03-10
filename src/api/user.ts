import axiosInstance from "../utils/axios"

const logIn = async (data: {
    email: string,
    password: string,
}) => {
    const userData = (await axiosInstance.post('/auth/singIn', {
        ...data
    }, {
        withCredentials: true,
    })).data;
    return userData;
}

const singUp = async(data: {
    email: string,
    nickname: string,
    password: string,
}) => {
    const userData = (await axiosInstance.post('/auth/singUp', {
        ...data
    }, {
        withCredentials: true,
    })).data;
    return userData;
}

const deleteCookies = async () => {
    await axiosInstance.get('/auth/deleteCookies', {
        withCredentials: true,
    });
}

export {
    logIn,
    singUp,
    deleteCookies,
}