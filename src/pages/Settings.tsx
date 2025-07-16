import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, User, Shield, Trash2, Mail } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    alert('Sesión cerrada correctamente.');
    navigate('/');
  };

  const opciones = [
    { label: 'Cambiar e-mail', icon: Mail, to: '/changeMail' },
    { label: 'Cambiar contraseña', icon: Shield, to: '/changePassword' },
    { label: 'Borrar historial', icon: Trash2, to: '/eraseHistory' },
    { label: 'Borrar cuenta', icon: User, to: '/eraseAccount' },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white px-6 pt-6 pb-10 font-poppins flex flex-col">
      <div className='md:mx-20 lg:mx-60'>
        {/* HEADER */}
        <div className="flex items-center space-x-4 mb-8">
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Ajustes
          </h1>
        </div>

        {/* OPCIONES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {opciones.map(({ label, icon: Icon, to }) => (
            <div
              key={to}
              onClick={() => navigate(to)}
              role="button"
              tabIndex={0}
              className="aspect-[3/4] bg-gray-700/50 rounded-xl border border-gray-500 flex items-center justify-center flex-col p-4 hover:bg-gray-600 transition"
            >
              <Icon className="w-20 h-10 text-purple-300 mb-4" />
              <span className="text-sm font-medium text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      

    </div>
  );
};

export default Settings;
