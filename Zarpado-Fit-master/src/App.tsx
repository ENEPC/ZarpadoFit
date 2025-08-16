import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";

// Páginas
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UploadPhoto } from "./pages/UploadPhoto";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { Profile } from "./pages/Profile";
import { Favoritos } from "./pages/Favoritos";
import { Historial } from "./pages/Historial";
import Catalogo from "./pages/Catalog";
import { DetallePrenda } from "./pages/DetallePrenda";
import { Recommendations } from "./pages/Recommendations";
import Settings from "./pages/Settings";
import Faq from "./pages/Faq";

// --- CAMBIO PRINCIPAL: Se eliminan todos los wrappers de Contexto de aquí ---
export const App = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
          <Route path="/virtual-try-on" element={<VirtualTryOn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/catalog" element={<Catalogo />} />
          <Route path="/recommendations" element={<Recommendations/>} />
          <Route path="/prenda/:id" element={<DetallePrenda />} />          
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </main>
    </div>
  );
};