import React from "react";
import { ImageIcon } from "lucide-react";

const imagenes = import.meta.glob('../img/*.{png,jpg,jpeg}', { eager: true, import: 'default' }) as Record<string, string>;


interface CartaProps {
    id: number;
    nombre: string;
    fecha: string;
    imagen: string;
}

const Card: React.FC<CartaProps> = ({id, imagen, nombre, fecha}) => {
    return (
        <div className="bg-slate-800/50 rounded-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
            <a href={"catalogue/"+id}>
                {/* Recuadro para la imagen */}
                <div className="aspect-[3/4] w-full bg-slate-700 flex items-center justify-center">
                    {imagen === "" ? (
                        <ImageIcon className="h-12 w-12 text-slate-500 group-hover:text-purple-400 transition-colors select-none" />
                    ) : (
                        <img src={decidirDireccionImagen(imagen)} alt="" className="h-full w-full object-cover select-none"/>
                    )}
                </div>
            
                {/* Contenido de texto debajo de la imagen */}
                <div className="p-4">
                    <p className="font-semibold text-white truncate select-none" title={nombre}>
                        {nombre}
                    </p>
                    <p className="text-sm text-gray-400 mt-1 select-none">
                        {fecha}
                    </p>
                </div>
            </a>
        </div>
    )
}

function decidirDireccionImagen(imagen:string){
    //Si la imagen esta en internet
    if(imagen.startsWith("https")) return imagen;

    //Si la imagen esta en local
    return Object.entries(imagenes).find(([path]) =>
    path.includes(`/img/${imagen}.`)
    )?.[1];
}

export default Card;