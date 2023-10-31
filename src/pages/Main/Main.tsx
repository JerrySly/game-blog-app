import './Main.scss';
import { MainFilter } from './components/MainFilter/MainFilter';
import { MainList } from './components/MainList/MainList';
import { Article } from '../../store/articles/types';
import { MainCarousel } from './components/MainCarousel/MainCarousel';
import { AppCarouselItem } from '../../store/common/type';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

export const Main = () => {
  // const list: Array<Article> = [
  //   {
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   },
  //   {
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   },
  //   {
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   },
  //   {
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   },
  //   {
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   },
  //   {
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   },{
  //     author:  {
  //       id: '1123',
  //       name: 'Eugene (Admin)',
  //     },
  //     date: new Date(),
  //     id: '1',
  //     mainPhoto: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
  //     name: 'Top 100 video games',
  //     startText: `Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.
  //     Today we are talking about most rate video games. I choose 100 best games ever at different statistics.`,
  //     text: `<p>Today we are talking about most rate video games. I choose 100 best games ever at different statistics.<p>
  //     <p>100: <b>Dota 2</b>. This game can take all your time. I personally know few people that wasted thousand hours in this game. I think Dota is best MOBA game, but addiction is a big pay for playing.</p>`
  //   }
  // ]
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    axiosInstance.get('/article?page=1&amount=20').then(x => {
      setArticleList(x.data);
    })
  }, [])
  const slides: Array<AppCarouselItem> = [
    {
      img: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
      mainText: 'Main',
      text: 'Second',
    },
    {
      img: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
      mainText: 'Main',
      text: 'Second',
    },
    {
      img: 'https://assets1.ignimgs.com/thumbs/userUploaded/2021/12/22/thetop100videogamesofalltime36190303top100games2021blogroll-1640211243485.jpg',
      mainText: 'Main',
      text: 'Second',
    }
  ]
  return (
    <div className='page-wrapper'>
      <MainList list={articleList}/>
    </div>
  );
}