import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
// ... importa todas tus páginas ...
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UploadPhoto } from "./pages/UploadPhoto";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { Profile } from "./pages/Profile";
import { Favoritos } from "./pages/Favoritos";
import { Historial } from "./pages/Historial";
import { Catalog } from "./pages/Catalogo";
import { DetallePrenda } from "./pages/DetallePrenda";
// 1. Importa el Provider
import { FavoritesProvider } from './context/FavoritesContext';

export const App = () => {
  return (
    // 2. Envuelve todo dentro del Provider
    <FavoritesProvider>
      <div className="min-h-screen bg-[#0f172a]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
          <Route path="/virtual-try-on" element={<VirtualTryOn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/detalle-prenda/:id" element={<DetallePrenda />} />
        </Routes>
      </div>
    </FavoritesProvider>
  );
};

