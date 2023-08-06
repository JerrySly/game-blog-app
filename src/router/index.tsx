import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { SingUp } from '../pages/SingUp/SingUp';
import {createRoot} from 'react-dom/client';
import App from '../App';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'sing-up',
        element: <SingUp />
      },
      {
        path: 'games',
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
