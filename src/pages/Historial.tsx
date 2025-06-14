import { History, Image as ImageIcon } from "lucide-react";

// Datos de ejemplo ampliados para que la cuadrícula se vea mejor (12 items)
const fullHistoryItems = [
  { id: 1, title: 'Camisa de Lino Blanca', date: 'Ayer' },
  { id: 2, title: 'Pantalón Cargo Negro', date: 'Hace 3 días' },
  { id: 3, title: 'Sudadera con Capucha Gris', date: 'Hace 3 días' },
  { id: 4, title: 'Zapatillas Urbanas Blancas', date: 'Hace 5 días' },
  { id: 5, title: 'Chaqueta de Jean Azul', date: 'La semana pasada' },
  { id: 6, title: 'Vestido de Verano Floral', date: 'La semana pasada' },
  { id: 7, title: 'Gorra de Béisbol Negra', date: 'Hace 2 semanas' },
  { id: 8, title: 'Gafas de Sol Aviador', date: 'Hace 2 semanas' },
  { id: 9, title: 'Botas de Cuero Marrón', date: 'Hace 3 semanas' },
  { id: 10, title: 'Camiseta Gráfica Vintage', date: 'Hace 1 mes' },
  { id: 11, title: 'Shorts Deportivos Grises', date: 'Hace 1 mes' },
  { id: 12, title: 'Mochila de Lona Negra', date: 'Hace 1 mes' },
];

export const Historial = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      {/* 1. Usamos max-w-7xl para darle más espacio a la cuadrícula, como en el Header */}
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <History className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold">Historial de Pruebas</h1>
        </div>
        
        {/* 2. Cambiamos ul a una cuadrícula (grid) responsiva */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fullHistoryItems.map((item) => (
            // 3. Esta es la nueva estructura de cada tarjeta
            <li 
              key={item.id}
              className="bg-slate-800/50 rounded-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* Recuadro para la imagen */}
              <div className="aspect-[3/4] w-full bg-slate-700 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </div>
              
              {/* Contenido de texto debajo de la imagen */}
              <div className="p-4">
                <p className="font-semibold text-white truncate" title={item.title}>
                  {item.title}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {item.date}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};
