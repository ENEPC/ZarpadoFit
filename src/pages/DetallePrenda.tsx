import { useParams } from 'react-router-dom';
import { prendasCatalogo } from '../data/prendas';
import { Button } from '../components/Button';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';

export const DetallePrenda = () => {
  const { id } = useParams<{ id: string }>();
  const prenda = prendasCatalogo.find(p => p.id === parseInt(id || ''));

  if (!prenda) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Prenda no encontrada</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        <div className="flex items-center justify-center bg-slate-800/50 rounded-lg p-4">
          <img 
            src={prenda.img} 
            alt={prenda.nombre} 
            className="w-full h-auto max-h-[70vh] object-contain rounded-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{prenda.nombre}</h1>
          {/* La línea del precio que estaba aquí ha sido eliminada */}
          <p className="text-gray-300 mb-8 leading-relaxed">{prenda.descripcion}</p>

          <div className="border-t border-b border-slate-700 py-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Detalles del producto</h2>
            <ul className="space-y-3">
              {Object.entries(prenda.detalles).map(([clave, valor]) => (
                <li key={clave} className="flex justify-between">
                  <span className="text-gray-400">{clave}:</span>
                  <span className="font-medium">{valor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="flex-1 flex items-center justify-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Comentar
            </Button>
            <Button variant="secondary" className="flex-1 flex items-center justify-center">
              <Heart className="mr-2 h-5 w-5" />
              Añadir a Favoritos
            </Button>
            <Button variant="primary" className="flex-1 flex items-center justify-center">
              <ArrowRight className="mr-2 h-5 w-5" />
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};