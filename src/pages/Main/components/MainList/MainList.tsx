import { CommonProps } from "../../../../common/props"
import { ArticleCard } from "../../../../components/article/ArticleCard/ArticleCard"
import { Article } from "../../../../store/articles/types"
import "./MainList.scss";

interface MainListI {
  list: Array<Article>
}

export const MainList = (props: CommonProps & MainListI) => {
  return (
    <>
      {/* <div className="article-list article-list_main">
        {props.list.slice(0, 3).map(x => 
        <ArticleCard
          className="article-list__item"
          article={x} 
        />)}
      </div> */}
    <div className="article-list article-list_second">
      {props.list.slice(3).map(x => 
      <ArticleCard
        className="article-list__item"
        short={true}
        article={x} 
      />)}
    </div>
  </>
  )
}