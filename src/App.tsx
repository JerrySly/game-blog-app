import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/layers/NavBar/NavBar';
import { router } from './router';
import { useAppDispatch, useAppSelector } from './hooks/custom-redux';
import { useEffect } from 'react';
import { getAllRoles } from './api/role';


function App() {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const roles = useAppSelector(state => state.app.roles);
  const userInfo = useAppSelector(state => state.auth.userInfo);

  useEffect(() => {
    if (!roles?.length) { 
      getAllRoles().then(data => {
        dispatch({
          type: 'app/setRoles',
          payload: data.data,
        });
      })
    }
    const token = localStorage.getItem('token');
    dispatch({
      type: 'auth/setInfoFromToken',
      payload: token,
    });
    if(!token) {
      navigate('/sing-up');
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
