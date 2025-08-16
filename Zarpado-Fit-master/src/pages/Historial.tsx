import { History, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useHistory } from "../context/HistoryContext";
import { Button } from "../components/Button";

export const Historial = () => {
  const { historyItems, removeFromHistory } = useHistory();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <History className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold">Historial de Pruebas</h1>
        </div>

        {historyItems.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-lg">
            <History className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Tu historial está vacío
            </h2>
            <p className="text-gray-400 mb-6">
              Prueba una prenda en el probador virtual para verla aquí.
            </p>
            <Link to="/virtual-try-on">
              <Button variant="primary">Ir al Probador</Button>
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {historyItems.map((item) => (
              <li
                key={item.id}
                className="bg-slate-800/50 rounded-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1 relative"
              >
                <Link to={`/prenda/${item.id}`}>
                  <div className="aspect-[3/4] w-full bg-slate-700">
                    <img
                      src={item.img}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="font-semibold text-white truncate"
                      title={item.nombre}
                    >
                      {item.nombre}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromHistory(item.id)}
                  className="absolute top-2 right-2 bg-red-600/80 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Eliminar del historial"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
