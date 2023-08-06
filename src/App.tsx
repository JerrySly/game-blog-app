import { Outlet, Route, useNavigate, redirect, Navigate } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/layers/NavBar/NavBar';
import { useSelector } from 'react-redux';
import { useAppSelector } from './hooks/custom-redux';
import { useEffect } from 'react';
import { SingUp } from './pages/SingUp/SingUp';

function App() {
  
  const authState = useAppSelector(state => state.auth.userIsAuth);
  const nav = useNavigate();

  if (!authState) {
    return  <>
      <Navigate to={'sing-up'}/>
      <SingUp />
      </>
  }

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
