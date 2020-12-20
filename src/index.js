import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeStore } from 'fluxible-js';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import getInitialStore from './fluxible/getInitialStore';

Amplify.configure(awsConfig);


initializeStore({
  initialStore: getInitialStore(),
  persist: {
    syncStorage: window.localStorage,
    restore({ authedUser }) {
      return { authedUser };
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
