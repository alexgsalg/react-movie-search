import { ThemeProvider } from '@ui5/webcomponents-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';

import './index.scss';
import { router } from './router.tsx';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
