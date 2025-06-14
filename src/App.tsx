import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UploadPhoto } from "./pages/UploadPhoto";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { Profile } from "./pages/Profile";
import { Favoritos } from "./pages/Favoritos";
import { Historial } from "./pages/Historial";
import { Catalog } from "./pages/Catalogo";
import { DetallePrenda } from "./pages/DetallePrenda"; // <-- 1. IMPORTAR LA NUEVA PÁGINA
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
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
        <Route path="/detalle-prenda/:id" element={<DetallePrenda />} /> {/* <-- 2. AÑADIR LA NUEVA RUTA */}
      </Routes>
    </div>
  );
};

