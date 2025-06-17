// src/App.tsx (Versión Final Completa)

import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";

// Páginas
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UploadPhoto } from "./pages/UploadPhoto";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { Profile } from "./pages/Profile";
import { Favoritos } from "./pages/Favoritos";
import { Historial } from "./pages/Historial";
import { Catalogo } from "./pages/Catalogo"; // Corregido de 'Catalog' a 'Catalogo'
import { DetallePrenda } from "./pages/DetallePrenda";

// Providers de Contexto
import { FavoritesProvider } from './context/FavoritesContext';
import { VirtualTryOnProvider } from "./context/VirtualTryOnContext";
import { HistoryProvider } from "./context/HistoryContext";

export const App = () => {
  return (
    // Los Providers envuelven toda la aplicación
    <FavoritesProvider>
      <VirtualTryOnProvider>
        <HistoryProvider>
          <div className="min-h-screen bg-[#0f172a]">
            <Header />
            <main> {/* Es una buena práctica envolver el contenido principal en <main> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload-photo" element={<UploadPhoto />} />
                <Route path="/virtual-try-on" element={<VirtualTryOn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/historial" element={<Historial />} />
                <Route path="/catalogo" element={<Catalogo />} />
                {/* Corregida la ruta para que coincida con la navegación del catálogo */}
                <Route path="/prenda/:id" element={<DetallePrenda />} /> 
              </Routes>
            </main>
          </div>
        </HistoryProvider>
      </VirtualTryOnProvider>
    </FavoritesProvider>
  );
};