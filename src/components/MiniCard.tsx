import { Link } from "react-router-dom";
import { ImageIcon } from "lucide-react";

interface MiniCartaProps {
  id: number;
  nombre: string;
  imagen: string;
}

const MiniCard: React.FC<MiniCartaProps> = ({ id, imagen, nombre }) => {
  // const ruta = Object.entries(imagenes).find(([path]) =>
  //     path.includes(`/img/${imagen}.`)
  // )?.[1];

  return (
    <Link
      to={`/prenda/${id}`}
      className="block w-full bg-gray-800/50 p-4 rounded-lg h-20 group transition hover:bg-gray-700"
    >
      <div className="flex items-center justify-between h-full space-x-4">
        {imagen === "" ? (
          <ImageIcon className="h-12 w-12 text-slate-500 group-hover:text-purple-400 transition-colors select-none" />
        ) : (
          <img
            src={imagen}
            alt={`Imagen de ${nombre}`}
            className="h-full w-auto object-cover rounded select-none"
          />
        )}
        {/* He reordenado un poco para que el nombre y la fecha estén juntos, es más semántico */}
        <div className="flex-grow text-left">
          <span className="text-white select-none block">{nombre}</span>
        </div>
      </div>
    </Link>
  );
};

export default MiniCard;
