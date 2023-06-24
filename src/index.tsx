import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.scss';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './app/store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4747',
    },
    secondary: {
      main: '#FC8B8B',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
