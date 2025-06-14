export const Favoritos = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Lista de Favoritos</h1>
        <p className="mb-8 text-gray-400 text-lg">Tus prendas guardadas para más tarde</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Se crean 4 recuadros de ejemplo para añadir prendas */}
          {Array(4).fill(null).map((_, i) => (
            <button
              key={i}
              className="border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center h-64 bg-slate-800/40 hover:bg-slate-700/60 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="text-slate-400 font-semibold group-hover:text-white">
                Añadir prenda
              </div>
            </button>
          ))}
        </div>
        
        {/* El botón "Procesar con IA" ha sido eliminado de aquí. */}

      </div>
    </div>
  );
};



