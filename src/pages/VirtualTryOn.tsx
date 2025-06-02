export default function VirtualTryOn() {
  // Simulamos un resultado
  const fakeResultUrl = "https://via.placeholder.com/300x400?text=Resultado+IA";

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
      <img
        src={fakeResultUrl}
        alt="Resultado IA"
        className="mb-4 rounded shadow"
      />
      <div className="space-y-2 w-full max-w-xs">
        <button className="w-full bg-yellow-400 text-black py-2 rounded">
          Guardar Outfit en Favoritos
        </button>
        <button className="w-full bg-white border py-2 rounded hover:bg-zinc-100">
          Cambiar Prendas
        </button>
        <button className="w-full bg-zinc-200 py-2 rounded hover:bg-zinc-300">
          Volver
        </button>
      </div>
    </div>
  );
}
