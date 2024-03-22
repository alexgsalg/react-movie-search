import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import './App.scss';
// components
import FooterComponent from './components/Footer/footer.component';
import HeaderComponent from './components/Header/header.component';
// imports
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <HeaderComponent />
      <main id="main-content">
        <Outlet />
      </main>
      <FooterComponent />
    </Provider>
  );
}

export default App;
