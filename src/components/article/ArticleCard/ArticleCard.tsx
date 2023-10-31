import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CommonProps } from "../../../common/props";
import { Article } from "../../../store/articles/types";
import "./ArticleCard.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";


interface ArticleCardProps {
  article: Article,
  short?: boolean,
}

export const ArticleCard = (props: CommonProps & ArticleCardProps) => {
  
  const [mainImg, setMainImg] = useState();

  useEffect(() => {
    console.log(props.article);
    axiosInstance.get(`image/${props.article.id}-${props.article.mainPicture}`).then(x => {
      console.log(x.data);
      if (!x.data) return;
      setMainImg(x.data);
    })
  }, [])

  return (
      <div className={`article ${props.short ? 'article_short' : '' } ${props.className}`}>
      <div className="article__img" >
        <img src={mainImg} alt="" />
      </div>
      <div className="article__info">
        <div className={`article__header ${props.short ? 'article__header_short' : ''}`}>{props.article.title}</div>
        <div
          className={`article__start ${props.short ? 'article__start_short' : ''}`}
          dangerouslySetInnerHTML={{ __html: props.article.startText}}
        />
          <div className="article__action action">
            <button className="app-btn__common">Читать</button>
          </div>
        <div></div>
      </div>
    </div>
  )
}