export default function Profile() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Perfil del Usuario
      </h2>
      <div className="space-y-4">
        <button className="w-full border py-2 rounded hover:bg-zinc-100">
          Cambiar E-mail
        </button>
        <button className="w-full border py-2 rounded hover:bg-zinc-100">
          Cambiar Contraseña
        </button>
        <button className="w-full border py-2 rounded hover:bg-zinc-100">
          Tus outfits favoritos
        </button>
        <button className="w-full border py-2 rounded hover:bg-zinc-100">
          Fotos subidas
        </button>
        <button className="w-full border py-2 rounded hover:bg-zinc-100">
          Historial de prendas
        </button>
      </div>
    </div>
  );
}
