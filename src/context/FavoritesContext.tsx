import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define la forma de los datos que nuestro contexto proveerá
interface FavoritesContextType {
  favorites: number[]; // Un array con los IDs de las prendas favoritas
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

// Creamos el contexto con un valor inicial de undefined
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Creamos el componente "Proveedor" que envolverá nuestra app
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Estado para guardar los IDs de las prendas favoritas.
  // Lo inicializamos leyendo desde el localStorage.
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const savedFavorites = localStorage.getItem('userFavorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error al leer favoritos del localStorage:', error);
      return [];
    }
  });

  // Usamos useEffect para guardar los favoritos en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem('userFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error al guardar favoritos en localStorage:', error);
    }
  }, [favorites]);

  const addFavorite = (id: number) => {
    setFavorites(prev => [...prev, id]);
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.includes(id);
  };

  // El valor que proveeremos a los componentes hijos
  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Creamos un "hook" personalizado para usar nuestro contexto fácilmente
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
};