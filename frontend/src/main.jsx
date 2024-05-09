import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import './App.css';
import Auth0ProviderWithNav from './auth/Auth0ProviderWithNav.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0ProviderWithNav>
       <AppRoutes />
    </Auth0ProviderWithNav>
     
    </BrowserRouter>
  </React.StrictMode>,
)
