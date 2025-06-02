import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-4 text-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-600">Zarpado Fit</h1>
        <p className="mt-2 text-zinc-700">Tu probador virtual de confianza</p>
      </header>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          to="/register"
          className="bg-indigo-600 text-white py-2 rounded shadow hover:bg-indigo-700"
        >
          Registrarme
        </Link>
        <Link
          to="/login"
          className="bg-white text-indigo-600 border border-indigo-600 py-2 rounded hover:bg-indigo-50"
        >
          Ingresar
        </Link>
        <Link to="/explore" className="text-indigo-500 underline">
          Explorar como invitado
        </Link>
      </div>
    </div>
  );
}
