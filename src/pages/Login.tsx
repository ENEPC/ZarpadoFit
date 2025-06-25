import { useState } from "react";
import { LogIn } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsuario } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí podría ir validación real
    if (email && password) {
      // Guardamos un usuario simple en localStorage
      const usuarioActivo = { email, nombre: "Usuario de prueba" };
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));
      setUsuario(usuarioActivo);
      
      // Navegamos al catálogo o pantalla principal
      navigate("/Catalog");
    } else {
      alert("Por favor ingresa email y contraseña");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Iniciar Sesión</h2>
            <p className="text-gray-300 mt-2">Accede a tu cuenta ZARPADO FIT</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full transform hover:scale-105"
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* ... el resto igual ... */}
          <p className="mt-8 text-center text-gray-300">
            ¿No tienes cuenta?{" "}
            <a
              href="/Register"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
