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
}

export const CommentInput = (props: CommentInputProps) => {

  const [comment, setComment] = useState<string | undefined>(undefined);
  const userUuid = useAppSelector(state => state.auth.userUuid);
  const location = useLocation();
  
  const clear = () => {
    setComment('');
  }

  const postComment = () => {
    if (comment && userUuid) sendComment(comment, props.articleUuid , userUuid);
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