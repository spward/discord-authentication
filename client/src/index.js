import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
let userId = localStorage.getItem('userId');
ReactDOM.render(
  <React.StrictMode>
    <App userId={userId} />
  </React.StrictMode>,
  document.getElementById('root')
);

