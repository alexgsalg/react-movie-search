import { ReactElement } from 'react';
import style from './header.module.scss';

import Logo from '../../assets/images/movies_logo.png';

export const HeaderComponent = (): ReactElement => {
  return (
    <header className={style.header + ' padding--sm'}>
      <div className="d-flex justify-content--center align-items--center gap--sm">
        <img src={Logo} className={style.header__logo} alt="Project logo" />
        <h1 className={style.header__title}>Movie Search</h1>
      </div>
    </header>
  );
};
