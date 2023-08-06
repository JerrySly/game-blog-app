import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { SingUp } from '../pages/SingUp/SingUp';
import {createRoot} from 'react-dom/client';
import App from '../App';


const router = createBrowserRouter([
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

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <RouterProvider router={router} /> 
  );
}