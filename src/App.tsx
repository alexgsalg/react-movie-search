import { Provider } from 'react-redux';
import { Outlet } from 'react-router';
import './App.scss';
// components
import FooterComponent from './components/Footer/footer.component';
import HeaderComponent from './components/Header/header.component';
// imports
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HeaderComponent />
        <main id="main-content">
          <Outlet />
        </main>
        <FooterComponent />
      </PersistGate>
    </Provider>
  );
}

export default App;
