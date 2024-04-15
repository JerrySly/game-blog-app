import './CommentInput.scss';
import { Button } from '@mui/material';
import AppTextarea from '../../../ui/AppTextarea/AppTextarea';
import { useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { useLocation, useNavigation } from 'react-router';
import { useAppSelector } from '../../../hooks/custom-redux';
import { sendComment } from '../../../api/comment';

interface CommentInputProps {
  articleUuid: string,
  parentComment?: string,
  onSend?: Function,
}

export const CommentInput = (props: CommentInputProps) => {

  const [comment, setComment] = useState<string | undefined>(undefined);
  const user = useAppSelector(state => state.auth.userInfo);
  const location = useLocation();
  
  const clear = () => {
    setComment('');
  }

  const postComment = () => {
    if (comment && user) sendComment(comment, props.articleUuid , user.uuid, props.parentComment);
    if (props.onSend) {
      props.onSend(comment);
    }
    clear();
  }

  return <div className='comment-input'>
    <AppTextarea placeholder="Comment" value={comment} onInput={(value) => setComment(value.currentTarget.value)}/>
    <div className='comment-input__actions'>
        <Button variant="contained" onClick={() => postComment()}>Send</Button>
        <Button variant="outlined" onClick={() => clear()}>Clear</Button>
    </div>
  </div>
}