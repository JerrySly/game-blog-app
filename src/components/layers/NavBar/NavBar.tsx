import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/custom-redux';
import { IoMdExit } from "react-icons/io";
import './NavBar.scss';

export const NavBar = () => {

  const user = useAppSelector(state => state.auth.userInfo);
  const roles = useAppSelector(state => state.app.roles);
  const dispatch = useAppDispatch();
  const isAdmin = roles.find(x => x.uuid === user?.role)?.name === 'admin';

  const logout = () => {
    dispatch({
      type: 'auth/logout',
    })
    localStorage.removeItem('token');
  }

  return (
    <div className="nav">
      <div className="nav__title"><a href='/'>This.Blog</a></div>
      <ul className='nav__menu menu'>
        {
          isAdmin ?
          <li className='menu__item'>
            <NavLink to={'/admin'}>Admin Panel</NavLink>
          </li>
          : null
        }
      </ul>
      { user
      ? <div className="nav__user">
          <p>{user?.nickname}</p>
          <div className='nav__exit' onClick={() => logout()}>
            <IoMdExit />
          </div>
        </div>  
      : <a href='/sing-up' className='nav__login'>
          Войти
        </a>
      }
    </div>
  )
}