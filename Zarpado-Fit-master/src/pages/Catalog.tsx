import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { prendasCatalogo } from "../data/prendas";
import type { PrendaDetallada } from "../data/prendas";

type Prenda = {
  nombre: string;
  img: string;
};

const Catalog = () => {
  const [busqueda, setBusqueda] = useState("");
  const [, setUsuarioLogueado] = useState<{
    nombre: string;
  } | null>(null);
  const [, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const recomendaciones = prendasCatalogo.slice(0, 4);

 //TODO conectar con la API para obtener el historial real
  const historial: Prenda[] = [
    {
      nombre: "Campera",
      img: "https://cdn.ssactivewear.com/Images/Color/19891_f_fl.jpg",
    },
    {
      nombre: "Remera Tupac",
      img: "https://media-photos.depop.com/b1/40720285/1504871696_1ce8aa9b10264d4eb29173ef197eeab6/P0.jpg",
    },
  ];

  useEffect(() => {
    const userJSON = localStorage.getItem("usuarioActivo");
    if (userJSON) {
      setUsuarioLogueado(JSON.parse(userJSON));
    } else {
      setUsuarioLogueado(null);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuVisible(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const irDetalle = (id: number) => {
    navigate(`/prenda/${id}`);
  };

  const filtrar = (items: PrendaDetallada[]) =>
    items.filter((item) =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  // const cerrarSesion = () => {
  //   localStorage.removeItem("usuarioActivo");
  //   setUsuarioLogueado(null);
  //   navigate("/Login");
  // };

  // const menuItems = usuarioLogueado
  //   ? [
  //       { texto: "Subir Foto", href: "/UploadPhoto" },
  //       { texto: "Ajustes", href: "/Settings" },
  //       { texto: "Cerrar Sesión", onClick: cerrarSesion },
  //     ]
  //   : [
  //       { texto: "Iniciar Sesión", href: "/Login" },
  //       { texto: "Crear Cuenta", href: "/Register" },
  //     ];

  return (
    <div className="px-6 py-6 bg-gray-900 min-h-screen text-white font-poppins">
      {/* Buscador y perfil */}

      {/* Galería */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">Nuestro Catálogo</h1>
          <p className="text-lg text-gray-400">
            Encuentra tu próximo look favorito
          </p>
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
            <h2 className="text-3xl font-semibold mb-6">
              Recomendaciones para ti
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <h3 className="text-lg font-semibold text-center">
                    {item.nombre}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Basado en tu historial
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filtrar(historial as PrendaDetallada[]).map((item) => (
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
                  <h3 className="text-lg font-semibold text-center">
                    {item.nombre}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
