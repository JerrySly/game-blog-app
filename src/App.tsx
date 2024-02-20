import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/layers/NavBar/NavBar';
import { router } from './router';
import { useAppDispatch, useAppSelector } from './hooks/custom-redux';

const token = localStorage.getItem('token');

function App() {
  
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  // if (token) {
  //   dispatch( { type: 'auth/setToken', payload: token});
  //   dispatch( { type: 'auth/setUserInfo', payload: { token }});
  // }

  if (router.state.location.pathname.includes('/admin')) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
