// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

type Usuario = { nombre: string } | null;

interface AuthContextType {
  usuario: Usuario;
  setUsuario: (u: Usuario) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(null);

  useEffect(() => {
    const userJSON = localStorage.getItem("usuarioActivo");
    if (userJSON) setUsuario(JSON.parse(userJSON));
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
};
