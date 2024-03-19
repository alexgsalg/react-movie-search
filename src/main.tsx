import { ThemeProvider } from '@ui5/webcomponents-react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
