import { useCallback, useEffect, useRef, useState } from "react"
import { getCommentsList } from "../../../api/comment";
import './CommentList.scss';
import { CommentItem } from "../CommentItem/CommentItem";
import {Comment} from '../CommentItem/CommentItem';
interface CommentListProps {
    articleUuid: string
}


export const CommentList = (props: CommentListProps) => {
    const observingObject = useRef(null);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(1);
    const [list, setList] = useState<Array<Comment>>([]);

    let options = {
        root: null,
        rootMargin: "40px",
        threshold: 1.0,
      };
      
    


    const getNextPage = () => {
        console.log('here', page);
        getCommentsList(page, amount, props.articleUuid).then(comments => {
            if (comments.data) {
                const newAdding = comments.data.data.rows;
                setList([...list, ...newAdding]);
                setPage(page + 1);
            }
        })
        
    }
    useEffect(() => {
        const observer = new IntersectionObserver(getNextPage, options);
        
        if (observingObject.current) {
            observer?.observe(observingObject.current);
        }
        return () => { 
            if (observingObject.current) {
                observer?.unobserve(observingObject.current);
            }
        }
    }, [page]);

    useEffect(() => {
        getNextPage();
    }, [])      

    return <div className="comment-list__wrapper">
        {
            // навести марафет, сделать нормальные на вид комменты
            list.map(item => 
                <CommentItem key={item.createdAt.toString()} comment={item}></CommentItem>
            )
        }
        <div ref={observingObject} id="intersect-obj-comments"/>
        </div>
    
}