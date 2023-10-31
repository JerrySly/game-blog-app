import { Outlet, Route, useNavigate, redirect, Navigate } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/layers/NavBar/NavBar';
import { useAppSelector } from './hooks/custom-redux';
import { SingUp } from './pages/SingUp/SingUp';
import { router } from './router';

function App() {
  
  const authState = useAppSelector(state => state.auth.userIsAuth);
  const nav = useNavigate();
  if (!authState) {
    return  <>
      <Navigate to={'sing-up'}/>
      <SingUp />
      </>
  }
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
