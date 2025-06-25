import { useFavorites } from "../context/FavoritesContext";
import { prendasCatalogo } from "../data/prendas";
//import { useNavigate } from 'react-router-dom';
import { Heart } from "lucide-react";
import Carta from "../components/Card"; // Asumí que es Card con C mayúscula por convención

export const Favoritos = () => {
  // 2. Obtiene la lista de IDs de favoritos del contexto
  const { favorites } = useFavorites();
  //const navigate = useNavigate();

  const prendasFavoritas = prendasCatalogo.filter((prenda) =>
    favorites.includes(prenda.id)
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Heart className="h-8 w-8 text-purple-400" />
          <h1 className="text-4xl font-bold select-none">Mis Favoritos</h1>
        </div>

        {/* 4. Muestra un mensaje si no hay favoritos, o la cuadrícula si los hay */}
        {prendasFavoritas.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-lg">
            <p className="text-xl text-gray-400">
              Aún no has añadido ninguna prenda a tus favoritos.
            </p>
            <p className="mt-2 text-gray-500">
              ¡Explora el catálogo y guarda lo que más te guste!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10 px-10 bg-slate-800/50 rounded-lg">
            {prendasFavoritas.map((item) => (
              // --- ¡CAMBIO PRINCIPAL AQUÍ! ---
              // Envolvemos el componente <Carta> en un div para manejar el click.
              // Esto hace que toda el área de la carta sea clickeable.
              <div
                key={item.id} // La 'key' siempre va en el elemento más externo del map.
                className="cursor-pointer group"
              >
                <Carta
                  id={item.id}
                  nombre={item.nombre}
                  fecha={"Algun momento"}
                  imagen={item.img}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// No olvides exportar el componente si no lo hiciste antes
// export default Favoritos; // Si es la exportación por defecto del archivo
