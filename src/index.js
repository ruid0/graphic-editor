import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { GlobalStyles } from './global-styles';

const root = document.getElementById('app');

const render = () => {
  if (root !== null) {
    ReactDOM.render(
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>,
      root
    );
  }
};

render();
