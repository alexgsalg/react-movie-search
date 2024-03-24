import { ReactElement } from 'react';
import style from './header.module.scss';

import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/movies_logo.png';

function HeaderComponent(): ReactElement {
  return (
    <header className={style.header + ' padding--sm'}>
      <div className="d-flex justify-content--start align-items--center gap--sm">
        <img src={Logo} className={style.header__logo} alt="Project logo" />
        <h1 className={style.header__title}>Movie Search</h1>

        <nav className={style.header_nav + ' margin-left--md'}>
          <li className={style.header_nav__link}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? style.active : '')}>
              Home
            </NavLink>
          </li>
          <li className={style.header_nav__link}>
            <NavLink
              to="favorites"
              className={({ isActive }) => (isActive ? style.active : '')}>
              Favorites
            </NavLink>
          </li>
        </nav>
      </div>
    </header>
  );
}

export default HeaderComponent;
