import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { indigo, teal } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo['A200']
    },
    secondary: {
      main: teal['A400']
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
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
