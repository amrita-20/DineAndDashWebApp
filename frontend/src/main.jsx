import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './AppRoutes.jsx';
import './App.css';
import Auth0ProviderWithNav from './auth/Auth0ProviderWithNav.jsx';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNav>
        <AppRoutes />
      </Auth0ProviderWithNav>
    </QueryClientProvider>
     
    </BrowserRouter>
  </React.StrictMode>,
)
