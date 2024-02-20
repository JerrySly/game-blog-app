import { useAppSelector } from '../../../hooks/custom-redux';
import './NavBar.scss';

export const NavBar = () => {

  const nickname = useAppSelector(state => state.auth.nickname);

  return (
    <div className="nav">
      <div className="nav__title"><a href='/'>This.Blog</a></div>
      { nickname
      ? <div className="nav__user">
          {nickname}
        </div>  
      : <a href='/sing-up' className='nav__login'>
          Войти
        </a>
      }
    </div>
  )
}