import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Set up the initial page state
document.body.style.visibility = 'hidden';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);