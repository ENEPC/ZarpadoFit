import {
  User,
  History,
  Image,
  LogOut,
  MessageCircleQuestion,
  Heart,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import MiniCarta from "../components/MiniCard";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "../context/HistoryContext";

export const Profile = () => {
  const navigate = useNavigate();
  // --- CAMBIO 1: Obtenemos 'actualizarUsuario' en lugar de 'setUsuario' ---
  const { actualizarUsuario } = useAuth();

  // --- CAMBIO 2: La función ahora es mucho más simple ---
  const handleLogout = () => {
    // Esta única línea ya se encarga de limpiar el estado Y el localStorage.
    // Ya no necesitas 'localStorage.removeItem' aquí.
    actualizarUsuario(null);
    navigate("/catalog");
  };
  //Se recupera el historial;
  const { historyItems } = useHistory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 mb-8 md:mb-4">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div className="select-none cursor-default">
              <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
              <p className="text-gray-300">Gestiona tu información personal</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-700/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 select-none cursor-default">
              <History className="h-5 w-5" />
              <span>Historial Reciente</span>
            </h3>
            <div className="space-y-3">
              {historyItems.slice(0, 3).map((item) => (
                <MiniCarta
                  key={item.id}
                  id={item.id}
                  nombre={item.nombre}
                  imagen={item.img}
                />
              ))}
              <NavLink to="/historial">
                <div className="w-full text-center mt-4">
                  <h3 className="text-sm font-semibold text-white select-none">
                    Ver más
                  </h3>
                </div>
              </NavLink>
            </div>
          </div>

          <div>
            <NavLink to="/favoritos">
              <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 select-none">
                  <Heart className="h-5 w-5" />
                  <span>Favoritos</span>
                </h3>
              </div>
            </NavLink>

            <NavLink to="/fotos-subidas">
              <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 select-none">
                  <Image className="h-5 w-5" />
                  <span>Fotos subidas</span>
                </h3>
              </div>
            </NavLink>

            <NavLink to="/faq">
              <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 select-none">
                  <MessageCircleQuestion className="h-5 w-5" />
                  <span>Preguntas frecuentes</span>
                </h3>
              </div>
            </NavLink>

            <button
              onClick={handleLogout}
              className="w-full text-left bg-gray-800/50 p-4 rounded-lg hover:bg-red-600 transition mt-4"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2 select-none">
                <LogOut className="h-5 w-5" />
                <span>Cerrar sesión</span>
              </h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
