import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App.tsx';
import './index.css';

// --- CAMBIO PRINCIPAL: Todos los providers se centralizan aquí ---
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { VirtualTryOnProvider } from './context/VirtualTryOnContext.tsx';
import { HistoryProvider } from './context/HistoryContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* El Router envuelve a todos los providers y a la App */}
    <BrowserRouter basename="/Zarpado-Fit/">
      {/* El AuthProvider es uno de los más importantes, usualmente va primero */}
      <AuthProvider>
        <FavoritesProvider>
          <HistoryProvider>
            <VirtualTryOnProvider>
              {/* App es el último componente, recibe el contexto de todos los de arriba */}
              <App />
            </VirtualTryOnProvider>
          </HistoryProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);