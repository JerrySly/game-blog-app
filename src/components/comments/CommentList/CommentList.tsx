import { useCallback, useEffect, useRef, useState } from "react"
import { getCommentsList } from "../../../api/comment";
import './CommentList.scss';
import { CommentItem } from "../CommentItem/CommentItem";
import {Comment} from '../CommentItem/CommentItem';
import useOnScreen from "hooks/useOnScreen";
interface CommentListProps {
    articleUuid: string
}


export const CommentList = (props: CommentListProps) => {
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState(10);
    const [list, setList] = useState<Array<Comment>>([]);
    const scrollBlock = useRef<HTMLDivElement>(null);
    const loadBlockOnScreen = useOnScreen(scrollBlock);

    const getNextPage = () => {
        console.log('here', page);
        if (list.length % amount === 0) {
            getCommentsList(page, amount, props.articleUuid).then(comments => {
                if (comments.data) {
                    const newAdding = comments.data.rows;
                    setList([...list, ...newAdding]);
                    setPage(page + 1);
                }
            })
        }
        
    }
    useEffect(() => {
       if (loadBlockOnScreen) {
        getNextPage();
       }
    }, [loadBlockOnScreen]);
   

    return <div className="comment-list__wrapper">
        {
            // навести марафет, сделать нормальные на вид комменты
            list.map(item => 
                <CommentItem key={item.createdAt.toString()} comment={item} articleUuid={props.articleUuid}></CommentItem>
            )
        }
        <div ref={scrollBlock} id="intersect-obj-comments"/>
        </div>
    
}