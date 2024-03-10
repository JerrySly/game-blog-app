import './Main.scss';
import { MainList } from './components/MainList/MainList';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

export const Main = () => {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    axiosInstance.get('/post?page=1&amount=20').then(x => {
      console.log(x);
      setArticleList(x.data?.data?.rows ?? []);
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