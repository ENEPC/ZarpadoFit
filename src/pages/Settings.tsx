import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeftCircle, User, Shield, Trash2, HelpCircle } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    alert('Sesión cerrada correctamente.');
    navigate('/');
  };

  const opciones = [
    { label: 'Perfil', icon: User, to: '/profile' },
    { label: 'Seguridad y acceso a la cuenta', icon: Shield, to: '/seguridad' },
    { label: 'Borrar historial', icon: Trash2, to: '/borrar-historial' },
    { label: 'Preguntas frecuentes', icon: HelpCircle, to: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 pt-6 pb-10 font-poppins flex flex-col">
      {/* HEADER */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/Catalog')}
          className="text-white hover:text-purple-400 transition"
          aria-label="Volver al catálogo"
        >
          <ArrowLeftCircle className="h-7 w-7" />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Ajustes
        </h1>
      </div>

      {/* OPCIONES */}
      <div className="space-y-4 flex-grow">
        {opciones.map(({ label, icon: Icon, to }) => (
          <div
            key={to}
            onClick={() => navigate(to)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(to)}
            className="bg-gray-800/70 hover:bg-gray-700 border border-gray-700/50 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <div className="flex items-center space-x-4">
              <Icon className="w-5 h-5 text-purple-300" />
              <span className="text-lg font-medium">{label}</span>
            </div>
            <span className="text-2xl text-gray-400 font-bold">&rsaquo;</span>
          </div>
        ))}
      </div>

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={cerrarSesion}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-lg tracking-wide rounded-full px-8 py-4 shadow-md hover:shadow-xl transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/60"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Settings;
