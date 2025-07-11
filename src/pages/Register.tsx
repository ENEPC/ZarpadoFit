import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch(
        "https://web-production-986ac.up.railway.app/api/usuarios/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: nombre,
            email: email,
            password: password,
            rol: "user", // o "admin" si deseas que el rol sea configurable
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar usuario");
      }

      alert("Registro exitoso, por favor inicia sesión");
      navigate("/login");
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
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
            <p className="text-gray-300 mt-2">
              Únete a la revolución del fashion-tech
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre completo"
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
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
              Crear Cuenta
            </Button>
          </form>

          <p className="mt-8 text-center text-gray-300">
            ¿Ya tienes cuenta?{" "}
            <a
              href="/login"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
