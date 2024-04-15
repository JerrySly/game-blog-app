import { Button, IconButton } from '@mui/material';
import './CommentItem.scss';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useEffect, useState } from 'react';
import { CommentInput } from '../CommentInput/CommentInput';
import { IoMdClose } from "react-icons/io";
import { getChilrenComments } from 'api/comment';
import { useAppSelector } from 'hooks/custom-redux';

export type Comment = {
    creater: string,
    createrName: string,
    text: string,
    uuid: string,
    createdAt: string | Date,
    createdByNickname: string,
    hasChildren: boolean,
}

type CommentItemProps = {
    comment: Comment,
    articleUuid: string,
    isChild?: boolean ,
}

export const CommentItem = ({
    comment,
    articleUuid,
    isChild = false,
}: CommentItemProps) => {
    const [childsOpened, setChildsOpened] = useState(false);
    const [childrenComments, setChildrenComments] = useState<Array<Comment>>([]);
    const [openInput, setOpenInput] = useState(false);
    const [page, setPage] = useState(1);
    const [amountChildren, setAmountChildren] = useState(0)
    const userName = useAppSelector(store => store.auth.userInfo?.nickname);

    useEffect(() => {
        if (childsOpened && !childrenComments?.length) {
            setPage(1);
            getChilrenComments(page, 10, articleUuid, comment.uuid).then(data => {
                setChildrenComments(data.rows);
                setAmountChildren(data.count);
            })
        }
    }, [childsOpened])

    const loadNewPage = () => {
        const newPage = page + 1;
        getChilrenComments(newPage, 10, articleUuid, comment.uuid).then(data => {
            setChildrenComments([...childrenComments, ...data.rows]);
            setAmountChildren(data.count);
        })
        setPage(newPage);
        console.log(page);
    }

    const NextChildrenPageButton = () => {
        return amountChildren > childrenComments?.length && childsOpened && !isChild ? <Button className='comment__next' onClick={loadNewPage}>Open next comments</Button> : null
    }

    const addComment = (comment: string) => {
        setChildrenComments([{
            text: comment,
            createdAt: '',
            createdByNickname: userName ?? '',
            creater: '',
            createrName: '',
            hasChildren: false,
            uuid: '',
        }, ...childrenComments]);
    }

    return <div className='comment__wrapper'> 
                <div className="comment list__comment">
                    <div className="comment__author">{comment.createdByNickname}</div>
                    <div className="comment__text">{comment.text}</div>
                    {   !isChild ?
                        <div className='comment__actions'>
                            <IconButton aria-label='arrow-circle-down' color='success' onClick={() => setChildsOpened(!childsOpened)}><ArrowCircleDownIcon/></IconButton>
                            <Button className='comment__answer' variant="outlined" color='success' onClick={() => setOpenInput(true)}>Ответить</Button>
                        </div>
                        : null
                    }
                </div>
                { openInput && !isChild ?
                    <div className='comment__input'>
                        <IoMdClose className='comment__close' onClick={() => setOpenInput(false)}/>
                        <CommentInput articleUuid={articleUuid} parentComment={comment.uuid} onSend={addComment}/>
                    </div>
                    : ''
                }
                {
                    childsOpened ?
                        <div className='comment__children'>
                            {childrenComments.map(x => <CommentItem articleUuid={articleUuid} comment={x} isChild={true} />)}
                        </div>
                    : ''
                }
                <NextChildrenPageButton />
            </div>
}