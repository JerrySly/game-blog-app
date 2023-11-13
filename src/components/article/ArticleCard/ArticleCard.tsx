import { CommonProps } from "../../../common/props";
import { Article } from "../../../store/articles/types";
import "./ArticleCard.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router";


interface ArticleCardProps {
  article: Article,
  short?: boolean,
}

export const ArticleCard = (props: CommonProps & ArticleCardProps) => {
  
  const [mainImg, setMainImg] = useState();
  const navigator = useNavigate();


  useEffect(() => {
    axiosInstance.get(`image/${props.article.id}-${props.article.mainPicture}`).then(x => {
      if (!x.data) return;
      setMainImg(x.data);
    })
  }, [])


  const toFullVersion = () => {
    navigator(`/article/${props.article.id}`);  
  }

  return (
      <div className={`article ${props.short ? 'article_short' : '' } ${props.className}`}>
      <div className="article__img" >
        <img src={`${process.env.REACT_APP_IMG_PATH}/${props.article.uuid}-${props.article.mainPicture}`} alt="" />
      </div>
      <div className="article__info">
        <div className={`article__header ${props.short ? 'article__header_short' : ''}`}>{props.article.title}</div>
        <div
          className={`article__start ${props.short ? 'article__start_short' : ''}`}
          dangerouslySetInnerHTML={{ __html: props.article.startText}}
        />
          <div className="article__action action">
            <button className="app-btn__common" onClick={() => toFullVersion()}>Читать</button>
          </div>
        <div></div>
      </div>
    </div>
  )
}