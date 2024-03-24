import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import FavoritesPage from './views/Favorites/favorites.page';
import HomePage from './views/Home/home.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
    ],
  },
]);
