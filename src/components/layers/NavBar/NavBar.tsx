import './NavBar.scss';

export const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav__title"><a href='/'>ThisBlog</a></div>
      <div className="nav__list list">
        <ul className="list__wrapper">
          <li className="list__el"><a href='/games'>Обо мне</a></li>
          <li className="list__el"><a href='/games'>Программирование</a></li>
          <li className="list__el"><a href='/games'>Хобби</a></li>
        </ul>
      </div>
    </div>
  )
}