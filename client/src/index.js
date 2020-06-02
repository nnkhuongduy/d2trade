import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { indigo, pink } from '@material-ui/core/colors'

import './index.css';
import App from './App';

import { store, persistor } from './redux/store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo['400']
    },
    secondary: {
      main: pink['300']
    },
    item: {
      immortal: '#e4ae39',
      arcana: '#ade55c',
      inscribed: '#CF6A32'
    }
  },
  spanEffect: {
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 0,
      transition: 'width 0.2s ease-in-out',
    },
    '&:hover': {
      color: indigo['A200'],
      '&::after': {
        border: '1px solid black',
        width: '100%'
      }
    }
  }
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
