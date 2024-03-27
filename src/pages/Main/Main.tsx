import './Main.scss';
import { MainList } from './components/MainList/MainList';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { BlogInfo } from './components/BlogInfo/BlogInfo';
import { useAppDispatch, useAppSelector } from 'hooks/custom-redux';
import { loadPosts } from 'api/post';
import useOnScreen from 'hooks/useOnScreen';

export const Main = () => {
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const loadBlockOnScreen = useOnScreen(scrollRef);
  const articles = useAppSelector(state => state.article.articles);
  const page = useAppSelector(state => state.article.page);
  const pageAmount = useAppSelector(state => state.article.pageAmount);
  const articlesIsLoaded = useAppSelector(state => state.article.isLoaded);

  
  const loadNewPage = () => {
    if (!articlesIsLoaded) {
      loadPosts(page, pageAmount).then(data => {
        console.log('result', data);
        dispatch({
          type: 'article/setArticles',
          payload: data.data
        });
      })
    }
  }


  useEffect(() => {
    if (loadBlockOnScreen) {
      loadNewPage();
    }
  }, [loadBlockOnScreen])

  return (
    <div>
      <BlogInfo />
      { 
        articles 
        ? <div id='scroll-article-list' className='page-wrapper'>
            <MainList list={articles}/>
          </div>
        : null
      }
      <div ref={scrollRef}></div>
    </div>
  );
}