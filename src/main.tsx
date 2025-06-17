// src/main.tsx

// src/main.tsx (Con todos los providers)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { VirtualTryOnProvider } from './context/VirtualTryOnContext.tsx';
import { HistoryProvider } from './context/HistoryContext.tsx'; // <--- IMPORTAR

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Zarpado-Fit/">
      <FavoritesProvider>
        <VirtualTryOnProvider>
          <HistoryProvider> {/* <--- ENVOLVER CON EL HISTORY PROVIDER */}
            <App />
          </HistoryProvider>
        </VirtualTryOnProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);