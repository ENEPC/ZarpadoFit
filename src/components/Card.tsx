import React from "react";
import { ImageIcon } from "lucide-react";

const imagenes = import.meta.glob('../img/*.{png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>;


interface CartaProps {
    nombre: string;
    fecha: string;
    imagen: string;
}

const Card: React.FC<CartaProps> = ({imagen, nombre, fecha}) => {
    const ruta = Object.entries(imagenes).find(([path]) =>
    path.includes(`/img/${imagen}.`)
    )?.[1];

    return (
        <div>
            {/* Recuadro para la imagen */}
            <div className="aspect-[3/4] w-full bg-slate-700 flex items-center justify-center">
                {imagen === "" ? (
                    <ImageIcon className="h-12 w-12 text-slate-500 group-hover:text-purple-400 transition-colors" />
                ) : (
                    <img src={ruta} alt="" className="h-full w-full object-cover"/>
                )}
            </div>
        
            {/* Contenido de texto debajo de la imagen */}
            <div className="p-4">
                <p className="font-semibold text-white truncate" title={nombre}>
                    {nombre}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                    {fecha}
                </p>
            </div>
        </div>
    )
}

export default Card;