import axiosInstance from "../utils/axios"

const getCommentsList = async (pageNumber: Number, amount: Number, articleUuid: string) => {
    console.log(pageNumber, 'number');
    const data = await (axiosInstance.get(`/comment/${articleUuid}`, {
        params: {
            pageNumber,
            amount,
            articleUuid
        }
    }));
    return data;
}

const sendComment = async (text: String, articleUuid: String, creater: String, parrent?: string) => {
    console.log('API', text, creater);
    await axiosInstance.post(`comment/${articleUuid}`, {
        text,
        createdBy: creater,
        parrent,
      });
}

export {
    getCommentsList,
    sendComment,
}