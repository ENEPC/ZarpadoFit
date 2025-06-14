import { HiOutlineClock } from "react-icons/hi";
import { Link } from "react-router-dom";

// Datos de ejemplo. En el futuro, esto debería venir como "props" desde el componente padre.
const historyItems = [
  { id: 1, title: "Prueba #1", date: "Hace 2 días" },
  { id: 2, title: "Prueba #2", date: "Hace 2 días" },
  { id: 3, title: "Prueba #3", date: "Hace 2 días" },
];

export const History = () => {
  return (
    // Tarjeta principal del historial
    <div className="bg-slate-800/50 rounded-lg p-6 w-full">
      {/* Encabezado */}
      <h2 className="flex items-center gap-3 text-xl font-bold mb-6">
        <HiOutlineClock className="text-2xl" />
        Historial Reciente
      </h2>
      
      {/* Lista de items */}
      <ul className="space-y-4 mb-6">
        {historyItems.map((item) => (
          <li 
            key={item.id} 
            className="flex justify-between items-center bg-slate-900/40 p-4 rounded-lg hover:bg-slate-700/60 transition-colors duration-300"
          >
            <span className="font-semibold">{item.title}</span>
            <span className="text-sm text-gray-400">{item.date}</span>
          </li>
        ))}
      </ul>
      
      {/* Enlace "Ver más" */}
      <Link to="/historial" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
        Ver más
      </Link>
    </div>
  );
};
