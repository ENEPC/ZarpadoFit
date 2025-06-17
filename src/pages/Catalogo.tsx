// src/pages/Catalogo.tsx (Con la ruta de navegación corregida)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prendasCatalogo } from '../data/prendas';
import type { PrendaDetallada } from '../data/prendas';

export const Catalogo = () => {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const recomendaciones = prendasCatalogo.slice(0, 4);
  const historial = prendasCatalogo.slice(0, 4).reverse();

  // --- ¡CAMBIO CLAVE AQUÍ! ---
  // Alineamos la ruta con la que está definida en App.tsx
  const irDetalle = (id: number) => {
    navigate(`/prenda/${id}`);
  };

  const filtrar = (items: PrendaDetallada[]) =>
    items.filter((item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-2">Nuestro Catálogo</h1>
            <p className="text-lg text-gray-400">Encuentra tu próximo look favorito</p>
            <div className="relative max-w-lg mx-auto mt-6">
                <input
                    type="text"
                    className="w-full rounded-full px-6 py-3 bg-slate-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Buscar en el catálogo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
        </div>
      
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-semibold mb-6">Recomendaciones para ti</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtrar(recomendaciones).map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => irDetalle(item.id)}
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
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Basado en tu historial</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtrar(historial).map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => irDetalle(item.id)}
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
          </section>
        </div>
      </div>
    </div>
  );
};