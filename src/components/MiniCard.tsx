import { ImageIcon } from "lucide-react";

const imagenes = import.meta.glob('../img/*.{png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>;

interface MiniCartaProps {
    id: number;
    nombre: string;
    fecha: string;
    imagen: string;
}

const MiniCard: React.FC<MiniCartaProps> = ({id, imagen, nombre, fecha}) => {
    //Busqueda de la imagen para mostrar
    const ruta = Object.entries(imagenes).find(([path]) =>
    path.includes(`/img/${imagen}.`)
    )?.[1];

    return (
        <a href={"catalogue/"+id} className="block w-full bg-gray-800/50 p-4 rounded-lg h-20 group transition hover:bg-gray-700">
            <div className="flex items-center justify-between h-full space-x-4">
                {imagen === "" ? (
                    <ImageIcon className="h-12 w-12 text-slate-500 group-hover:text-purple-400 transition-colors select-none" />
                ) : (
                    <img src={ruta} alt="" className="h-full w-auto object-cover rounded select-none" />
                )}
                <span className="text-white select-none">{nombre}</span>
                <span className="text-gray-400 text-sm select-none">{fecha}</span>
            </div>
        </a>

    )
}

export default MiniCard;