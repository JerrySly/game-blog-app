import './NavBar.scss';

export const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav__title"><a href='/'>Game-Blog</a></div>
      <div className="nav__list list">
        <ul className="list__wrapper">
          <li className="list__el"><a href='/games'>Games</a></li>
          <li className="list__el"><a href='/hobbies'>Hobby</a></li>
          <li className="list__el"><a href='/offers'>Offers</a></li>
        </ul>
      </div>
      <div className="nav__user-block user-block">
        <img className="user-block__avatar" src="https://placehold.co/600x400" alt="user avatar" />
        <p className="user-block__name">Eugeale</p>
      </div>
    </div>
  )
}