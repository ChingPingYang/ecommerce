import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './styled/1_theme';
import { ThemeProvider } from 'styled-components';
import Global from './styled/Global';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <Global />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

