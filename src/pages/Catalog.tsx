import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

type Prenda = {
  nombre: string;
  img: string;
};

const Catalog = () => {
  const [busqueda, setBusqueda] = useState('');
  const [usuarioLogueado, setUsuarioLogueado] = useState<{ nombre: string } | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const recomendaciones: Prenda[] = [
    {
      nombre: 'Buzo con capucha',
      img: 'https://svijetmajice.com/wp-content/uploads/2022/11/cod_ghosts_hoodica-600x600.jpg',
    },
    {
      nombre: 'Pantalón Jogger',
      img: 'https://i5.walmartimages.com/asr/16338ece-4cdb-4be2-8212-4982baf44d4c.5c7c22e5df418e2e256ac9c3c3f9862f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff',
    },
  ];

  const historial: Prenda[] = [
    {
      nombre: 'Campera',
      img: 'https://cdn.ssactivewear.com/Images/Color/19891_f_fl.jpg',
    },
    {
      nombre: 'Remera Tupac',
      img: 'https://media-photos.depop.com/b1/40720285/1504871696_1ce8aa9b10264d4eb29173ef197eeab6/P0.jpg',
    },
  ];

  useEffect(() => {
    const userJSON = localStorage.getItem('usuarioActivo');
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

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const irDetalle = (img: string, nombre: string) => {
    navigate(`/detalle-prenda?img=${encodeURIComponent(img)}&nombre=${encodeURIComponent(nombre)}`);
  };

  const filtrar = (items: Prenda[]) =>
    items.filter((item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivo');
    setUsuarioLogueado(null);
    navigate('/Login');
  };

  const menuItems = usuarioLogueado
    ? [
        { texto: 'Subir Foto', href: '/UploadPhoto' },
        { texto: 'Ajustes', href: '/Settings' },
        { texto: 'Cerrar Sesión', onClick: cerrarSesion },
      ]
    : [
        { texto: 'Iniciar Sesión', href: '/Login' },
        { texto: 'Crear Cuenta', href: '/Register' },
      ];

  return (
    <div className="px-6 py-6 bg-gray-900 min-h-screen text-white font-poppins">
      {/* Buscador y perfil */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
        <div className="relative flex-grow mr-4 max-w-lg">
          <input
            type="text"
            className="w-full rounded-md px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Buscar prenda..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-full w-6 h-6 flex justify-center items-center text-white font-bold"
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>

        {/* Foto perfil o ícono cámara */}
        <div
          className="relative cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setMenuVisible((prev) => !prev);
          }}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded={menuVisible}
          aria-controls="menuPerfil"
        >
          {usuarioLogueado ? (
            <img
              src="https://th.bing.com/th/id/R.08cae159ae25c0aa8ff4225be82cf586?rik=lKcfc1EZ9dV5YA&riu=http%3a%2f%2fpersonajeshistoricos.com%2fwp-content%2fuploads%2f2018%2f03%2flenin-1.jpg&ehk=p3vy4MHPpyVrJ%2bqW1W7owTz400XNaUwXLwoJJQv285E%3d&risl=&pid=ImgRaw&r=0"
              alt="Foto de perfil"
              className="rounded-full w-14 h-14 object-cover border-2 border-purple-500 shadow-md"
            />
          ) : (
            <Camera size={40} className="text-gray-400" />
          )}

          {menuVisible && (
            <div
              id="menuPerfil"
              className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
              role="menu"
              ref={menuRef}
            >
              {menuItems.map((item) =>
                item.onClick ? (
                  <div
                    key={item.texto}
                    onClick={() => {
                      item.onClick && item.onClick();
                      setMenuVisible(false);
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        item.onClick && item.onClick();
                        setMenuVisible(false);
                      }
                    }}
                    className="px-5 py-3 hover:bg-purple-600 cursor-pointer transition-colors duration-200"
                  >
                    {item.texto}
                  </div>
                ) : (
                  <div
                    key={item.texto}
                    onClick={() => {
                      navigate(item.href);
                      setMenuVisible(false);
                    }}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        navigate(item.href);
                        setMenuVisible(false);
                      }
                    }}
                    className="px-5 py-3 hover:bg-purple-600 cursor-pointer transition-colors duration-200"
                  >
                    {item.texto}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Galería */}
      <div className="max-w-6xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl font-semibold mb-6 border-b border-purple-600 pb-2">
            Recomendaciones
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {filtrar(recomendaciones).map((item) => (
              <div
                key={item.nombre}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500 hover:scale-105 transform transition-transform duration-300"
                onClick={() => irDetalle(item.img, item.nombre)}
              >
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="mt-2 text-center text-lg font-medium text-purple-400">{item.nombre}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6 border-b border-purple-600 pb-2">
            Basado en tu historial
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {filtrar(historial).map((item) => (
              <div
                key={item.nombre}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500 hover:scale-105 transform transition-transform duration-300"
                onClick={() => irDetalle(item.img, item.nombre)}
              >
                <img
                  src={item.img}
                  alt={item.nombre}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="mt-2 text-center text-lg font-medium text-purple-400">{item.nombre}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Catalog;

