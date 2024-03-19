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

const sendComment = async (text: String, articleUuid: String, creater: String) => {
    await axiosInstance.post('comment/', {
        text,
        articleUuid,
        creater,
      });
}

export {
    getCommentsList,
    sendComment,
}