import { useEffect, useState } from "react";
import { CommonProps } from "../../common/props"
import axiosInstance from "../../utils/axios";
import { useNavigate, useParams } from "react-router";
import { Article as ArticleType } from "../../store/articles/types";
import "./Article.scss";
import { Breadcrumbs, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CommentInput } from "../../components/comments/CommentInput/CommentInput";
import { useAppSelector } from "../../hooks/custom-redux";
import { CommentList } from "../../components/comments/CommentList/CommentList";

export const Article = (props: CommonProps) => {
    const { uuid } = useParams();
    const [article, setArticle] = useState<ArticleType | undefined>();
    const navigator = useNavigate();
    const userIsAuth = useAppSelector(
        state => state.auth.token, 
    );
    useEffect(() => {
        axiosInstance.get(`/post/${uuid}`).then(data => {
            console.log(data);
            setArticle(data.data);
        })
    }, []);
    const toLogIn = () => {
        navigator('/sing-up');
    }
    return <div className="article__page-wrapper">
        <Breadcrumbs  className="article__breadcrumbs">
            <Link style={{
                textDecoration: 'none',
            }} to={'/'}>Articles List</Link>
            <Typography style={{
                fontSize: '25px',
            }} >{article?.title}</Typography>
        </Breadcrumbs>
        { article ? 
            <img src={`${process.env.REACT_APP_IMG_PATH}/${uuid}-${article?.photo}`} alt="" className="article__img" />
            : null
        }
        <h2 className="article__title">{article?.title}</h2>
        <div className="article__text" dangerouslySetInnerHTML={{__html: article?.text ?? ''}} />
        <Divider light />
        {
            userIsAuth && article ?  <CommentInput articleUuid={article?.uuid}/>
            : <div className="article__comments-warning">
                <div>You need to login to send comments</div>
                <Button variant="contained" onClick={() => toLogIn()}>LogIn</Button>
            </div>
        }
        { article ? <CommentList articleUuid={article?.uuid}/> : null }
        
    </div>
}