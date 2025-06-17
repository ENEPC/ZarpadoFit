import { Image as ThumbsUp } from "lucide-react";
import Carta from "../components/Card";

// Datos de ejemplo ampliados para que la cuadrícula se vea mejor (12 items)
const fullRecommendItems = [
  { id: 1, title: 'Camisa de Lino Blanca', date: 'Ayer', image: "camisa" },
  { id: 2, title: 'Pantalón Cargo Negro', date: 'Hace 3 días', image: "" },
  { id: 3, title: 'Sudadera con Capucha Gris', date: 'Hace 3 días', image: "" },
  { id: 4, title: 'Zapatillas Urbanas Blancas', date: 'Hace 5 días', image: "" },
  { id: 5, title: 'Chaqueta de Jean Azul', date: 'La semana pasada', image: "" },
  { id: 6, title: 'Vestido de Verano Floral', date: 'La semana pasada', image: "" },
  { id: 7, title: 'Gorra de Béisbol Negra', date: 'Hace 2 semanas', image: "" },
  { id: 8, title: 'Gafas de Sol Aviador', date: 'Hace 2 semanas', image: "" },
  { id: 9, title: 'Botas de Cuero Marrón', date: 'Hace 3 semanas', image: "" },
  { id: 10, title: 'Camiseta Gráfica Vintage', date: 'Hace 1 mes', image: "" },
  { id: 11, title: 'Shorts Deportivos Grises', date: 'Hace 1 mes', image: "" },
  { id: 12, title: 'Mochila de Lona Negra', date: 'Hace 1 mes', image: "" },
];

export const Recommendations = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <ThumbsUp className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold select-none">Recomendaciones</h1>
        </div>
        
        <ul className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fullRecommendItems.map((item) => (
            <div className="bg-slate-800/50 rounded-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                <Carta key={item.id} id={item.id} nombre={item.title} fecha={item.date} imagen={item.image}/>
            </div>
          ))}
        </ul>

      </div>
    </div>

  );
};
