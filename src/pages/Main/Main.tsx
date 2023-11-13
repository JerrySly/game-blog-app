import './Main.scss';
import { MainList } from './components/MainList/MainList';
import { AppCarouselItem } from '../../store/common/type';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

export const Main = () => {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    axiosInstance.get('/article?page=1&amount=20').then(x => {
      setArticleList(x.data.data.rows);
    })
  }, [])
  return (
    articleList 
    ? <div className='page-wrapper'>
      <MainList list={articleList}/>
    </div>
    : null
  );
}