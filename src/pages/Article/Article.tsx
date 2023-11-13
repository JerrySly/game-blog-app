import { useEffect, useState } from "react";
import { CommonProps } from "../../common/props"
import axiosInstance from "../../utils/axios";
import { useParams } from "react-router";
import { Article as ArticleType } from "../../store/articles/types";
import "./Article.scss";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Article = (props: CommonProps) => {
    const { id } = useParams();
    const [article, setArticle] = useState<ArticleType | null>(null);
    useEffect(() => {
        axiosInstance.get(`/article/${id}`).then(data => {
            setArticle(data.data);
        })
    }, []);
    return <div className="article__page-wrapper">
        <Breadcrumbs  className="article__breadcrumbs">
            <Link style={{
                textDecoration: 'none',
            }} to={'/'}>Articles List</Link>
            <Typography style={{
                fontSize: '25px',
            }} >{article?.title}</Typography>
        </Breadcrumbs>
        <img src={`${process.env.REACT_APP_IMG_PATH}/${article?.uuid}-${article?.mainPicture}`} alt="" className="article__img" />
        <h2 className="article__title">{article?.title}</h2>
        <div className="article__text" dangerouslySetInnerHTML={{__html: article?.mainText ?? ''}} />
    </div>
}