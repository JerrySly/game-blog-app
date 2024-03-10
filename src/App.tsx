import { Outlet } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/layers/NavBar/NavBar';
import { router } from './router';
import { useAppDispatch, useAppSelector } from './hooks/custom-redux';
import { useEffect } from 'react';
import { getAllRoles } from './api/role';
import { setRoles } from './store/app';
import { PrivateRoute } from './components/system/PrivateRoute';
import { setInfoFromToken } from './store/auth';


function App() {
  
  const dispatch = useAppDispatch();

  const roles = useAppSelector(state => state.app.roles);

  useEffect(() => {
    if (!roles?.length) { 
      getAllRoles().then(data => {
        dispatch({
          type: 'app/setRoles',
          payload: data.data,
        });
      })

      const token = localStorage.getItem('token');
      dispatch({
        type: 'auth/setInfoFromToken',
        payload: token,
      });
    }
  }, []);

  return (
    <div>
      {
        !router.state.location.pathname.includes('/admin') ? <NavBar /> : null 
      }
      <Outlet />
    </div>
  );
}

export default App;
