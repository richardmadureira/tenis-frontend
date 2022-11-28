import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spinner } from './components/spinner';
import routes from './routes';

import { QueryClientProvider } from 'react-query';
import './assets/styles/global.css';
import { queryClient } from './utils/query-client';
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<Spinner />} />
    </QueryClientProvider>
  </React.StrictMode>
)
