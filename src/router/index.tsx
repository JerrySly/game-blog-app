import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import { Main } from '../pages/Main/Main';
import { Admin } from '../pages/Admin/Admin';
import { Article } from '../pages/Article/Article';
import { ArticleCreate } from '../components/admin/ArticleCreate/ArticleCreate';
import { ArticlesList } from '../components/admin/ArtilcesList/ArticlesList';
import { SingUp } from '../pages/SingUp/SingUp';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />
      },
      {
        path: 'sing-up',
        element: <SingUp />
      },
      { 
        path: 'article/:uuid',
        element: <Article />
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'create-article',
            element: <ArticleCreate />
          },
          {
            path: 'edit-article/:uuid',
            element: <ArticleCreate />
          },
          {
            path:'articles-list',
            element: <ArticlesList />
          }
        ]
      },
      {
        path: 'hobbies'
      },
      {
        path: 'offers'
      }
    ]
  },
])
