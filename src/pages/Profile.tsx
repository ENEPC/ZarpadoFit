import { History } from "../components/RecentHistory";
import { ProfileActions } from "../components/ProfileActions";

export const Profile = () => {
  return (
    // Contenedor principal de la página
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      {/* Contenedor del contenido del perfil, centrado y con ancho máximo */}
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado del Perfil */}
        <div className="flex items-center space-x-6 mb-12">
          <div className="bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full w-20 h-20 flex items-center justify-center text-4xl shadow-lg">
            {/* Ícono de usuario */}
            👤 
          </div>
          <div>
            <h1 className="text-4xl font-bold">Mi Perfil</h1>
            <p className="text-gray-400 text-lg">Gestiona tu información personal</p>
          </div>
        </div>

        {/* Layout de 2 Columnas (se convierte en 1 columna en pantallas pequeñas) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- COLUMNA IZQUIERDA --- */}
          {/* Ahora solo contiene el historial */}
          <main className="flex-1">
            <History />
          </main>
          
          {/* --- COLUMNA DERECHA --- */}
          <aside className="w-full lg:w-auto">
            <ProfileActions />
          </aside>

        </div>
      </div>
    </div>
  );
};

