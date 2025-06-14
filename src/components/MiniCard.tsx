import { ImageIcon } from "lucide-react";

const imagenes = import.meta.glob('../img/*.{png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>;


interface MiniCartaProps {
    nombre: string;
    fecha: string;
    imagen: string;
}

const MiniCard: React.FC<MiniCartaProps> = ({imagen, nombre, fecha}) => {
    const ruta = Object.entries(imagenes).find(([path]) =>
    path.includes(`/img/${imagen}.`)
    )?.[1];

    return (
        <div className="bg-gray-800/50 p-4 rounded-lg h-20">
            <div className="flex items-center justify-between h-full space-x-4">
                {imagen === "" ? (
                    <ImageIcon className="h-12 w-12 text-slate-500 group-hover:text-purple-400 transition-colors" />
                ) : (
                    <img src={ruta} alt="" className="h-full w-auto object-cover rounded" />
                )}
                <span className="text-white">{nombre}</span>
                <span className="text-gray-400 text-sm">{fecha}</span>
            </div>
        </div>
    )
}

export default MiniCard;