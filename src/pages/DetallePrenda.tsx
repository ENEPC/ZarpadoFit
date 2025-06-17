

import { useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { prendasCatalogo } from '../data/prendas';
import { Button } from '../components/Button';
import { Heart, MessageSquare, ArrowRight, Star } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useVirtualTryOn } from '../context/VirtualTryOnContext';

const RATING_CATEGORIES = [ 'Relación precio-calidad', 'Comodidad', 'Calidad de las terminaciones', 'Calidad de los materiales' ];
interface Opinion { autor: string; texto: string; valoraciones: { [key: string]: number }; }
const StarRating = ({ rating }: { rating: number }) => { return (<div className="flex items-center">{[...Array(5)].map((_, index) => { const starValue = index + 1; return (<Star key={index} className={`h-5 w-5 ${starValue <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-500'}`} /> ); })}<span className="ml-2 text-sm text-gray-300">({rating.toFixed(1)})</span></div>);};

export const DetallePrenda = () => {
  const { id } = useParams<{ id: string }>();
  const prenda = prendasCatalogo.find(p => p.id === parseInt(id || ''));
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const { setPrendaParaProbar } = useVirtualTryOn();

  const [mostrarOpiniones, setMostrarOpiniones] = useState(false);
  const [opiniones, setOpiniones] = useState<Opinion[]>([ { autor: 'Carla G.', texto: '¡Me encantó! La tela es súper cómoda...', valoraciones: { 'Relación precio-calidad': 4, 'Comodidad': 5, 'Calidad de las terminaciones': 5, 'Calidad de los materiales': 4 } }, { autor: 'Marcos "El Toro" P.', texto: 'Muy buena calidad. La compré para el gym...', valoraciones: { 'Relación precio-calidad': 5, 'Comodidad': 4, 'Calidad de las terminaciones': 4, 'Calidad de los materiales': 5 } } ]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevasValoraciones, setNuevasValoraciones] = useState<{ [key: string]: number }>({});
  const opinionesRef = useRef<HTMLDivElement>(null);
  const promedios = useMemo(() => { if (opiniones.length === 0) return null; const totales = RATING_CATEGORIES.reduce((acc, categoria) => ({ ...acc, [categoria]: 0 }), {} as { [key: string]: number }); let totalGeneral = 0; let countGeneral = 0; for (const opinion of opiniones) { for (const categoria of RATING_CATEGORIES) { if (opinion.valoraciones[categoria]) { totales[categoria] += opinion.valoraciones[categoria]; totalGeneral += opinion.valoraciones[categoria]; countGeneral++; } } } const promediosCategoria: { [key: string]: number } = {}; for (const categoria in totales) { promediosCategoria[categoria] = totales[categoria] / opiniones.length; } const promedioGeneral = totalGeneral / countGeneral; return { general: promedioGeneral, categorias: promediosCategoria }; }, [opiniones]);

  if (!prenda) { return <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center"><h1 className="text-3xl font-bold">Prenda no encontrada</h1></div>; }
  
  const esFavorito = isFavorite(prenda.id);
  const handleFavoriteClick = () => { esFavorito ? removeFavorite(prenda.id) : addFavorite(prenda.id); };
  const handleComentarClick = () => { setMostrarOpiniones(true); setTimeout(() => { opinionesRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100); };
  const handlePublicarOpinion = (e: React.FormEvent) => { e.preventDefault(); if (nuevoComentario.trim() && Object.keys(nuevasValoraciones).length === RATING_CATEGORIES.length) { const nuevaOpinion: Opinion = { autor: 'Usuario Zarpado', texto: nuevoComentario, valoraciones: nuevasValoraciones, }; setOpiniones([nuevaOpinion, ...opiniones]); setNuevoComentario(''); setNuevasValoraciones({}); } else { alert('Por favor, completa el texto de tu opinión y todas las valoraciones con estrellas.'); } };
  
  const handleContinuarClick = () => {
    if (prenda) {
      setPrendaParaProbar(prenda);
      // --- ¡ESTA ES LA LÍNEA CORREGIDA! ---
      navigate('/virtual-try-on'); 
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#0f172a] text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex items-center justify-center bg-slate-800/50 rounded-lg p-4"><img src={prenda.img} alt={prenda.nombre} className="w-full h-auto max-h-[70vh] object-contain rounded-md"/></div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">{prenda.nombre}</h1>
              <p className="text-gray-300 mb-8 leading-relaxed">{prenda.descripcion}</p>
              <div className="border-t border-b border-slate-700 py-6 mb-8"><h2 className="text-xl font-semibold mb-4">Detalles del producto</h2><ul className="space-y-3">{Object.entries(prenda.detalles).map(([clave, valor]) => (<li key={clave} className="flex justify-between"><span className="text-gray-400">{clave}:</span><span className="font-medium">{valor}</span></li>))}</ul></div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" className="flex-1 flex items-center justify-center" onClick={handleComentarClick}><MessageSquare className="mr-2 h-5 w-5" />Comentar</Button>
                <Button variant={esFavorito ? 'primary' : 'secondary'} className="flex-1 flex items-center justify-center" onClick={handleFavoriteClick}><Heart className={`mr-2 h-5 w-5 ${esFavorito ? 'text-white fill-current' : ''}`}/>{esFavorito ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}</Button>
                <Button variant="primary" className="flex-1 flex items-center justify-center" onClick={handleContinuarClick}><ArrowRight className="mr-2 h-5 w-5" />Continuar</Button>
              </div>
            </div>
        </div>
      </div>
      {/* El resto del componente no cambia */}
      {mostrarOpiniones && ( <div ref={opinionesRef} className="bg-[#0f172a] text-white p-4 md:p-8 pt-0"><div className="max-w-4xl mx-auto bg-slate-800/50 rounded-lg p-6"><h2 className="text-3xl font-bold mb-6 border-b border-slate-700 pb-4">Opiniones de la prenda</h2> {promedios && (<div className="mb-10 p-4 bg-slate-900 rounded-lg"><div className="flex items-center text-xl font-bold mb-4"><Star className="h-6 w-6 text-yellow-400 mr-2"/>Valoración general: {promedios.general.toFixed(1)} / 5</div><ul className="space-y-2">{Object.entries(promedios.categorias).map(([categoria, valor]) => (<li key={categoria} className="flex flex-col sm:flex-row sm:items-center justify-between"><span className="text-gray-300">{categoria}:</span><StarRating rating={valor} /></li>))}</ul></div>)}<form onSubmit={handlePublicarOpinion} className="mb-8"><h3 className="text-xl font-semibold mb-4">Dejá tu opinión y valoración</h3><div className="space-y-3 bg-slate-700/50 p-4 rounded-md mb-4">{RATING_CATEGORIES.map(categoria => (<div key={categoria} className="flex flex-col sm:flex-row justify-between items-center"><label className="mb-1 sm:mb-0">{categoria}</label><div className="flex">{[...Array(5)].map((_, index) => { const ratingValue = index + 1; return (<Star key={ratingValue} className={`h-6 w-6 cursor-pointer transition-colors ${ ratingValue <= (nuevasValoraciones[categoria] || 0) ? 'text-yellow-400 fill-current' : 'text-gray-500 hover:text-yellow-300' }`} onClick={() => setNuevasValoraciones({...nuevasValoraciones, [categoria]: ratingValue })}/>);})}</div></div>))}</div><textarea className="w-full bg-slate-700 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" rows={4} placeholder="¡Contanos qué te pareció esta prenda zarpada!" value={nuevoComentario} onChange={(e) => setNuevoComentario(e.target.value)}></textarea><Button type="submit" variant="primary" className="mt-3">Publicar Opinión</Button></form><div className="space-y-6">{opiniones.length > 0 ? ( opiniones.map((opinion, index) => (<div key={index} className="p-4 bg-slate-900 rounded-md border-l-4 border-blue-500"><p className="font-bold text-lg">{opinion.autor}</p><p className="text-gray-300 mt-1">{opinion.texto}</p></div> ))) : (<p className="text-gray-400">Todavía no hay opiniones. ¡Sé el primero en comentar!</p>)}</div></div></div>)}
    </>
  );
};