import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import stores from './stores'
import { Provider } from 'mobx-react'



ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

