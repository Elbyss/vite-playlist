import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { routes } from './routes';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'sonner';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster position='top-left' expand={true} richColors />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
