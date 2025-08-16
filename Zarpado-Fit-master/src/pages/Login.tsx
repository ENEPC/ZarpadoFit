import { useState } from "react";
import { LogIn } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
// --- CAMBIO 3 (MEJORA): Importamos Link para la navegación interna ---
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // --- CAMBIO 1: Obtenemos 'actualizarUsuario' en lugar de 'setUsuario' ---
  const { actualizarUsuario } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor ingresa email y contraseña");
      return;
    }

    try {
      const response = await fetch(
        `https://web-production-986ac.up.railway.app/api/usuarios/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      if (!response.ok) {
        // Asumiendo que la API puede devolver un mensaje de error en formato JSON
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Credenciales inválidas");
      }

      const usuario = await response.json();

      // --- CAMBIO 2: Usamos la nueva función para guardar la sesión correctamente ---
      // Esto actualiza el estado de React Y guarda en localStorage.
      actualizarUsuario(usuario);

      // Redirigir al catálogo o página principal
      navigate("/catalog");
    } catch (error: any) {
      alert(`Error: ${error.message}`);
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
              required
            />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full transform hover:scale-105"
            >
              Iniciar Sesión
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-300">
            ¿No tienes cuenta?{" "}
            {/* --- CAMBIO 3 (CONTINUACIÓN): Usamos <Link> para no recargar la página --- */}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
