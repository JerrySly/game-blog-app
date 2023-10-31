import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import { Main } from '../pages/Main/Main';
import { Admin } from '../pages/Admin/Admin';
import { BlogCreate } from '../components/admin/BlogCreate/BlogCreate';


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
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'create-blog',
            element: <BlogCreate />
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
