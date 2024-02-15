import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router/index.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
