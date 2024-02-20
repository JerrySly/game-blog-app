import './CommentItem.scss';

export type Comment = {
    creater: string,
    createrName: string,
    text: string,
    createdAt: string | Date,
}

export const CommentItem = (props: {
    comment: Comment
}) => {
    return <div className="comment list__comment">
                <div className="comment__author">{props.comment.createrName}</div>
                <div className="comment__text">{props.comment.text}</div>
            </div>
}