import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './router/index.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AuthContextProvider from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
