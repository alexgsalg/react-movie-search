import { ReactElement } from 'react';
import style from './footer.module.scss';

function FooterComponent(): ReactElement {
  return (
    <footer className={style.footer + ' padding--xs'}>
      <span className={style.footer__copy}>© 2024 Test project</span>
    </footer>
  );
}

export default FooterComponent;
