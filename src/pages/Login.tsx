import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold text-center text-indigo-600">
          Iniciar sesión
        </h2>
        <form className="mt-4 space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Ingresar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">O ingresa con</p>
          <button className="mt-2 w-full border py-2 rounded hover:bg-zinc-100">
            Google
          </button>
        </div>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-500 underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
