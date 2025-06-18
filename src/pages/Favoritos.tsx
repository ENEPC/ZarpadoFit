
import { useFavorites } from '../context/FavoritesContext';
import { prendasCatalogo } from '../data/prendas';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Favoritos = () => {
  // 2. Obtiene la lista de IDs de favoritos del contexto
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  // 3. Filtra el catálogo completo para obtener solo las prendas favoritas
  const prendasFavoritas = prendasCatalogo.filter(prenda => favorites.includes(prenda.id));

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <Heart className="h-8 w-8 text-purple-400" />
            <h1 className="text-4xl font-bold">Mis Favoritos</h1>
        </div>

        {/* 4. Muestra un mensaje si no hay favoritos, o la cuadrícula si los hay */}
        {prendasFavoritas.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-lg">
            <p className="text-xl text-gray-400">Aún no has añadido ninguna prenda a tus favoritos.</p>
            <p className="mt-2 text-gray-500">¡Explora el catálogo y guarda lo que más te guste!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {prendasFavoritas.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer group"
                onClick={() => navigate(`/prenda/${item.id}`)}
              >
                <div className="rounded-lg overflow-hidden mb-4 shadow-lg">
                  <img
                    src={item.img}
                    alt={item.nombre}
                    className="w-full h-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">{item.nombre}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


