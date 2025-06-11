import { useState } from "react";
import { User, History } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Profile = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 py-12 px-4">
      <div className={`${showHistory ? "max-w-4xl" : "max-w-2xl"} mx-auto transition-all duration-500`}>
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

          <div className={`${showHistory ? "grid md:grid-cols-2 gap-8" : "block"}`}>
            <div className="space-y-6">
              <Input label="Nombre completo" defaultValue="Usuario de Prueba" />
              <Input label="Email" type="email" defaultValue="usuario@ejemplo.com" />

              <div className="flex space-x-4">
                <Button variant="primary">Guardar Cambios</Button>
                <Button variant="primary" onClick={() => setShowHistory(!showHistory)}>
                  {showHistory ? "Ocultar historial" : "Mostrar historial"}
                </Button>
              </div>
            </div>

            {showHistory && (
              <div className="bg-gray-700/30 rounded-xl p-6 mt-8 md:mt-0">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
