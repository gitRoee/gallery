import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.tsx'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { SnackbarProvider } from './context/ErrorContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StrictMode>
  </BrowserRouter>
)
