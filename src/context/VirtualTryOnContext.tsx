// src/context/VirtualTryOnContext.tsx

import { createContext, useState, useContext, type ReactNode } from 'react';
// Usamos el tipo exacto de tu archivo prendas.ts
import type { PrendaDetallada } from '../data/prendas';

interface VirtualTryOnContextType {
  prendaParaProbar: PrendaDetallada | null;
  setPrendaParaProbar: (prenda: PrendaDetallada | null) => void;
}

const VirtualTryOnContext = createContext<VirtualTryOnContextType | undefined>(undefined);

export const VirtualTryOnProvider = ({ children }: { children: ReactNode }) => {
  const [prendaParaProbar, setPrendaParaProbar] = useState<PrendaDetallada | null>(null);

  const value = {
    prendaParaProbar,
    setPrendaParaProbar,
  };

  return (
    <VirtualTryOnContext.Provider value={value}>
      {children}
    </VirtualTryOnContext.Provider>
  );
};

export const useVirtualTryOn = () => {
  const context = useContext(VirtualTryOnContext);
  if (context === undefined) {
    throw new Error('useVirtualTryOn debe ser usado dentro de un VirtualTryOnProvider');
  }
  return context;
};