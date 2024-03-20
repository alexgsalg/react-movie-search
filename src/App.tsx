import { Outlet } from 'react-router';
import './App.scss';

import FooterComponent from './components/Footer/footer.component';
import HeaderComponent from './components/Header/header.component';

function App() {
  return (
    <>
      <HeaderComponent />
      <main id="main-content">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}

export default App;
