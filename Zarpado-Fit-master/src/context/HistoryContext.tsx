// src/context/HistoryContext.tsx

import{ createContext, useState, useContext, type ReactNode } from 'react';
import type { PrendaDetallada } from '../data/prendas';

// 1. Definimos la forma del contexto
interface HistoryContextType {
  historyItems: PrendaDetallada[];
  addToHistory: (prenda: PrendaDetallada) => void;
  removeFromHistory: (prendaId: number) => void;
}

// 2. Creamos el contexto
const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

// 3. Creamos el proveedor
export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [historyItems, setHistoryItems] = useState<PrendaDetallada[]>([]);

  // Función para AÑADIR una prenda al historial
  const addToHistory = (prenda: PrendaDetallada) => {
    setHistoryItems(prevItems => {
      // Evita duplicados y pone el último probado al principio
      const otherItems = prevItems.filter(item => item.id !== prenda.id);
      return [prenda, ...otherItems];
    });
  };

  // Función para QUITAR una prenda del historial por su ID
  const removeFromHistory = (prendaId: number) => {
    setHistoryItems(prevItems => prevItems.filter(item => item.id !== prendaId));
  };

  const value = { historyItems, addToHistory, removeFromHistory };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};

// 4. Creamos el Hook personalizado para usarlo fácilmente
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory debe ser usado dentro de un HistoryProvider');
  }
  return context;
};