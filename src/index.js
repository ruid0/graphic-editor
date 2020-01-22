import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';

const root = document.getElementById('app');

const render = () => {
  if (root !== null) {
    ReactDOM.render(<App />, root);
  }
};

render();
