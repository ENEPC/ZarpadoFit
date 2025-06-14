import { User, History, Key, Star, Image, Mail, Cross, LogOut, MessageCircleQuestion } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { NavLink } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
              <p className="text-gray-300">Gestiona tu información personal</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            

            <div className="bg-gray-700/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Historial Reciente</span>
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Prueba #{item}</span>
                      <span className="text-gray-400 text-sm">Hace 2 días</span>
                    </div>
                  </div>
                ))}
                
                <NavLink to="/historial">
                  <div className="w-full text-center mb-4">
                    <h3 className="text-sm font-semibold text-white">
                      Ver más
                    </h3>
                  </div>
                </NavLink>
              </div>
            </div>

            <div>
              <NavLink to="/favoritos">
                <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Favoritos</span>
                  </h3>
                </div>
              </NavLink>

              <NavLink to="/fotos-subidas">
                <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <Image className="h-5 w-5" />
                    <span>Fotos subidas</span>
                  </h3>
                </div>
              </NavLink>

              <NavLink to="/faq">
                <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <MessageCircleQuestion className="h-5 w-5" />
                    <span>Preguntas frecuentes</span>
                  </h3>
                </div>
              </NavLink>

              <NavLink to="/logout">
                <div className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700 transition">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar sesión</span>
                  </h3>
                </div>
              </NavLink>
            </div>

          </div>
          <div>
            <h1 className="text-4xl font-bold">Mi Perfil</h1>
            <p className="text-gray-400 text-lg">Gestiona tu información personal</p>
          </div>
        </div>

       
        <div className="flex flex-col lg:flex-row gap-8">
          
          
          <main className="flex-1">
            <History />
          </main>
          
          
          <aside className="w-full lg:w-auto">
            <ProfileActions />
          </aside>

        </div>


        



      </div>
    </div>
  );
};

