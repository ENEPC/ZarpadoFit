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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Obtener lista de usuarios del localStorage
    const usuariosStr = localStorage.getItem("usuarios") || "[]";
    const usuarios = JSON.parse(usuariosStr);

    // Verificar que el email no exista ya
    if (usuarios.some((u: any) => u.email === email)) {
      alert("Ya existe un usuario registrado con ese email");
      return;
    }

    // Agregar nuevo usuario
    usuarios.push({ nombre, email, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso, por favor inicia sesión");

    // Redirigir a login
    navigate("/login");
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
